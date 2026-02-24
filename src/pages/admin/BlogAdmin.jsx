import React, { useState } from 'react';
import { supabase } from '../../supabase';
import { Plus, Edit, Trash2, X, Upload, Save, Loader } from 'lucide-react';
import { compressImage } from '../../utils/imageOptimizer';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const fetchPosts = async () => {
    const { data, error } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
};

const BlogAdmin = () => {
    const queryClient = useQueryClient();
    const { data: posts = [], isLoading: loading } = useQuery({
        queryKey: ['blogPosts'],
        queryFn: fetchPosts,
    });

    const [isEditing, setIsEditing] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);
    const [uploading, setUploading] = useState(false);

    // Form State
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('Technology');
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const resetForm = () => {
        setTitle('');
        setContent('');
        setCategory('Technology');
        setImageFile(null);
        setImageUrl('');
        setCurrentPost(null);
        setIsEditing(false);
    };

    const handleEdit = (post) => {
        setCurrentPost(post);
        setTitle(post.title);
        setContent(post.content);
        setCategory(post.category);
        setImageUrl(post.image);
        setIsEditing(true);
    };

    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            const { error } = await supabase.from('blog_posts').delete().eq('id', id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
            toast.success("Post deleted successfully!");
        },
        onError: (error) => {
            console.error("Error deleting post:", error);
            toast.error("Error deleting post: " + error.message);
        }
    });

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            deleteMutation.mutate(id);
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const [statusText, setStatusText] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);
        setUploadProgress(0);
        setStatusText('Starting...');

        try {
            let finalImageUrl = imageUrl;

            if (imageFile) {
                let fileToUpload = imageFile;

                // Only compress if larger than 500KB
                if (imageFile.size > 500 * 1024) {
                    console.log("Starting image compression...");
                    setStatusText('Compressing Image...');
                    try {
                        const compressedBlob = await compressImage(imageFile);
                        fileToUpload = new File([compressedBlob], imageFile.name, {
                            type: 'image/jpeg',
                        });
                        console.log(`Original: ${imageFile.size / 1024}KB, Compressed: ${fileToUpload.size / 1024}KB`);
                    } catch (compressionError) {
                        console.error("Compression failed, using original file:", compressionError);
                    }
                } else {
                    console.log("Image is small (" + Math.round(imageFile.size / 1024) + "KB), skipping compression.");
                }

                console.log("Starting upload...");
                setStatusText('Uploading: 0%');

                const storagePath = `${Date.now()}_${imageFile.name}`;

                // Retry logic for upload
                let uploadSuccess = false;
                let retryCount = 0;
                const maxRetries = 3;

                while (!uploadSuccess && retryCount < maxRetries) {
                    try {
                        if (retryCount > 0) {
                            setStatusText(`Retrying upload (${retryCount}/${maxRetries})...`);
                            await new Promise(resolve => setTimeout(resolve, 1000 * retryCount)); // Backoff
                        }

                        const { data, error } = await supabase.storage.from('blog-images').upload(storagePath, fileToUpload);

                        if (error) throw error;

                        const { data: { publicUrl } } = supabase.storage.from('blog-images').getPublicUrl(storagePath);
                        finalImageUrl = publicUrl;

                        setUploadProgress(100);
                        setStatusText(`Uploading: 100%`);
                        uploadSuccess = true;
                    } catch (error) {
                        console.error(`Upload attempt ${retryCount + 1} failed:`, error);
                        retryCount++;
                        if (retryCount >= maxRetries) throw error;
                    }
                }
            }

            setStatusText('Saving to Database...');
            console.log("Saving post data...");

            const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

            const postData = {
                title,
                slug,
                content,
                category,
                image: finalImageUrl,
                updated_at: new Date().toISOString(),
            };

            if (currentPost) {
                const { error } = await supabase.from('blog_posts').update(postData).eq('id', currentPost.id);
                if (error) throw error;
            } else {
                const { error } = await supabase.from('blog_posts').insert([{
                    ...postData,
                    views: 0
                }]);
                if (error) throw error;
            }

            console.log("Save complete!");
            toast.success("Post saved successfully!");

            resetForm();
            queryClient.invalidateQueries({ queryKey: ['blogPosts'] });

            // Invalidate the specific post's cache directly
            queryClient.invalidateQueries({ queryKey: ['blogPost', slug] });
        } catch (error) {
            console.error("Error saving post:", error);
            let errorMessage = "Error saving post. ";
            if (error.code === 'storage/unauthorized') {
                errorMessage += "Permission denied. Check Storage Rules.";
            } else if (error.code === 'storage/canceled') {
                errorMessage += "Upload was canceled.";
            } else if (error.code === 'storage/unknown') {
                errorMessage += "Unknown storage error.";
            } else {
                errorMessage += error.message;
            }
            toast.error(errorMessage);
        } finally {
            setUploading(false);
            setStatusText('');
            setUploadProgress(0);
        }
    };

    return (
        <div className="max-w-[1200px] mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold font-heading text-text">Blog Management</h2>
                <button className="inline-flex items-center gap-2 px-4 py-2 border-none rounded-lg font-semibold cursor-pointer transition-all bg-primary text-white hover:bg-primary-light hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => setIsEditing(true)} disabled={isEditing}>
                    <Plus size={18} /> New Post
                </button>
            </div>

            {isEditing ? (
                <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-border">
                        <h3 className="text-xl font-bold text-text m-0">{currentPost ? 'Edit Post' : 'Create New Post'}</h3>
                        <button className="bg-transparent border-none text-text-muted hover:text-red-500 cursor-pointer p-1" onClick={resetForm}><X size={20} /></button>
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold text-text text-sm">Title</label>
                            <input
                                className="p-3 border border-border rounded-lg outline-none font-main text-base focus:border-primary focus:ring-1 focus:ring-primary"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                placeholder="Enter post title..."
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-2">
                                <label className="font-semibold text-text text-sm">Category</label>
                                <select className="p-3 border border-border rounded-lg outline-none font-main text-base focus:border-primary focus:ring-1 focus:ring-primary appearance-none bg-white cursor-pointer" value={category} onChange={(e) => setCategory(e.target.value)}>
                                    <option value="Technology">Technology</option>
                                    <option value="Farming Tips">Farming Tips</option>
                                    <option value="Market News">Market News</option>
                                    <option value="Success Stories">Success Stories</option>
                                    <option value="Sustainability">Sustainability</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-semibold text-text text-sm">Cover Image</label>
                                <div className="relative border-2 border-dashed border-border rounded-lg p-5 text-center cursor-pointer hover:border-primary transition-colors hover:bg-primary/5 flex flex-col items-center justify-center gap-2">
                                    <input className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" type="file" onChange={handleImageChange} accept="image/*" />
                                    <Upload className="text-text-muted" size={18} />
                                    <span className="font-medium text-sm text-text-muted">{imageFile ? imageFile.name : (imageUrl ? 'Change Image' : 'Upload Image')}</span>
                                </div>
                                {imageUrl && !imageFile && <span className="text-xs text-text-muted">Current image loaded</span>}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-semibold text-text text-sm">Content (Markdown Supported)</label>
                            <textarea
                                className="p-3 border border-border rounded-lg outline-none font-main text-base focus:border-primary focus:ring-1 focus:ring-primary resize-y min-h-[200px]"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                                rows={15}
                                placeholder="# Heading\nWrite your content here..."
                            ></textarea>
                        </div>

                        <div className="flex justify-end gap-4 mt-4 pt-4 border-t border-border">
                            <button type="button" className="inline-flex items-center gap-2 px-6 py-2 border-2 border-primary rounded-lg font-semibold cursor-pointer transition-all bg-transparent text-primary hover:bg-primary hover:text-white" onClick={resetForm}>Cancel</button>
                            <button type="submit" className="inline-flex items-center gap-2 px-6 py-2 border-none rounded-lg font-semibold cursor-pointer transition-all bg-primary text-white hover:bg-primary-light hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed" disabled={uploading}>
                                {uploading ? <Loader className="animate-spin" size={18} /> : <Save size={18} />}
                                {uploading ? statusText : 'Save Post'}
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    {loading ? (
                        <div className="p-12 text-center text-text-muted flex justify-center items-center gap-2">
                            <Loader className="animate-spin" size={20} /> Loading posts...
                        </div>
                    ) : (
                        <>
                            {posts.length === 0 ? (
                                <div className="p-12 text-center text-text-muted">No posts found. Create one!</div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr>
                                                <th className="p-4 text-left border-b border-border bg-primary/5 font-semibold text-primary">Image</th>
                                                <th className="p-4 text-left border-b border-border bg-primary/5 font-semibold text-primary">Title</th>
                                                <th className="p-4 text-left border-b border-border bg-primary/5 font-semibold text-primary">Category</th>
                                                <th className="p-4 text-left border-b border-border bg-primary/5 font-semibold text-primary">Date</th>
                                                <th className="p-4 text-left border-b border-border bg-primary/5 font-semibold text-primary">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {posts.map(post => (
                                                <tr key={post.id} className="hover:bg-surface transition-colors">
                                                    <td className="p-4 text-left border-b border-border">
                                                        <div className="w-16 h-10 rounded overflow-hidden bg-gray-100 shrink-0">
                                                            {post.image && <img className="w-full h-full object-cover" src={post.image} alt={post.title} />}
                                                        </div>
                                                    </td>
                                                    <td className="p-4 text-left border-b border-border font-medium text-text">{post.title}</td>
                                                    <td className="p-4 text-left border-b border-border"><span className="inline-block px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-semibold">{post.category}</span></td>
                                                    <td className="p-4 text-left border-b border-border text-sm text-text-muted">{post.created_at ? new Date(post.created_at).toLocaleDateString() : 'Just now'}</td>
                                                    <td className="p-4 text-left border-b border-border">
                                                        <div className="flex gap-2">
                                                            <button className="w-8 h-8 rounded flex items-center justify-center border-none cursor-pointer transition-colors bg-secondary/10 text-secondary hover:bg-secondary hover:text-white" onClick={() => handleEdit(post)}><Edit size={16} /></button>
                                                            <button className="w-8 h-8 rounded flex items-center justify-center border-none cursor-pointer transition-colors bg-red-100 text-red-500 hover:bg-red-500 hover:text-white" onClick={() => handleDelete(post.id)}><Trash2 size={16} /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default BlogAdmin;
