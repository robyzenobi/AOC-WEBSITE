import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabase';
import { Calendar, User, ArrowLeft, Share2, Loader } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

const fetchPost = async ({ queryKey }) => {
    const [_key, slug] = queryKey;
    const { data, error } = await supabase.from('blog_posts').select('*').eq('slug', slug).single();
    if (error && error.code !== 'PGRST116') throw error;
    return data || null;
};

const BlogPost = () => {
    const { slug } = useParams();

    const { data: post, isLoading: loading } = useQuery({
        queryKey: ['blogPost', slug],
        queryFn: fetchPost,
        enabled: !!slug,
    });

    if (loading) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center p-5 md:p-8 pt-[120px]">
                <Loader className="animate-spin text-primary mb-4" size={40} />
                <p className="text-text-muted font-medium">Loading post...</p>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-5 md:p-8 pt-[120px]">
                <h2 className="text-3xl font-bold font-heading mb-4 text-text">Post not found</h2>
                <Link to="/blog" className="inline-block bg-primary text-white px-6 py-3 rounded-full font-bold shadow-md hover:bg-primary-light transition-colors mt-4">Back to Blog</Link>
            </div>
        );
    }

    return (
        <article className="min-h-screen bg-surface pb-12 md:pb-20">
            <div className="relative h-[50vh] min-h-[400px] flex items-end pb-12 bg-cover bg-center bg-no-repeat mt-[80px]" style={{ backgroundImage: `url(${post.image})` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                <div className="max-w-7xl w-full mx-auto px-5 md:px-8 relative z-10">
                    <div className="max-w-3xl text-white">
                        <span className="inline-block bg-primary text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">{post.category}</span>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 leading-tight">{post.title}</h1>
                        <div className="flex flex-wrap items-center gap-6 text-white/80 font-medium">
                            <span className="flex items-center gap-2"><Calendar size={18} /> {post.created_at ? new Date(post.created_at).toLocaleDateString() : 'Recent'}</span>
                            <span className="flex items-center gap-2"><User size={18} /> Admin</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-5 md:px-8 -mt-8 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 lg:gap-12">
                    <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-black/5">
                        {/* Simple markdown-like rendering for now, or use a library if added later */}
                        <div className="text-lg text-text leading-relaxed space-y-6">
                            {post.content.split('\n').map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5">
                            <h3 className="text-lg font-bold font-heading mb-4 text-text">Share this post</h3>
                            <div className="flex gap-3">
                                <button className="inline-flex items-center gap-2 px-4 py-2 border border-border text-text rounded-lg hover:bg-surface transition-colors text-sm font-semibold w-full justify-center">
                                    <Share2 size={16} /> Share
                                </button>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5">
                            <Link to="/blog" className="inline-flex items-center justify-center gap-2 text-primary font-semibold hover:text-primary-light transition-colors w-full">
                                <ArrowLeft size={16} /> Back to all posts
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default BlogPost;
