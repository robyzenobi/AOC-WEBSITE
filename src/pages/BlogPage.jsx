import React from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase';
import { Loader } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import { useQuery } from '@tanstack/react-query';

const fetchPosts = async () => {
    const { data, error } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data;
};

const BlogPage = () => {
    const { t } = useTranslation();

    const { data: posts = [], isLoading: loading } = useQuery({
        queryKey: ['blogPosts'],
        queryFn: fetchPosts,
    });

    if (loading) {
        return (
            <div className="py-14 md:py-24 text-center mt-[80px]">
                <div className="max-w-7xl mx-auto px-5 md:px-8">
                    <Loader className="animate-spin mx-auto text-primary mb-4" size={40} />
                    <p className="text-text-muted">Loading articles...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <section className="relative min-h-[400px] pt-[80px] flex items-center justify-center text-center text-white bg-cover bg-center" style={{
                backgroundImage: "linear-gradient(rgba(27, 77, 62, 0.9), rgba(27, 77, 62, 0.8)), url('https://images.unsplash.com/photo-1595856419342-570a290c01a1?auto=format&fit=crop&q=80&w=1200')"
            }}>
                <div className="max-w-7xl mx-auto px-5 md:px-8 text-center text-white">
                    <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Agricultural Insights</h1>
                    <p className="text-lg opacity-90 max-w-2xl mx-auto">Latest news, farming tips, and market updates from AOC TZ.</p>
                </div>
            </section>

            <div className="py-14 md:py-24 bg-surface">
                <div className="max-w-7xl mx-auto px-5 md:px-8">
                    {posts.length === 0 ? (
                        <div className="text-center text-lg text-text-muted font-medium">No posts found. Check back later!</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map(post => (
                                <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
                                    <div className="relative h-[220px] overflow-hidden">
                                        <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    </div>
                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="flex items-center justify-between text-sm text-text-muted mb-4">
                                            <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full font-semibold text-xs">{post.category}</span>
                                            <span className="font-medium text-xs">{post.created_at ? new Date(post.created_at).toLocaleDateString() : 'Recent'}</span>
                                        </div>
                                        <h3 className="text-xl font-bold mb-3 text-text leading-tight">{post.title}</h3>
                                        <p className="text-text-muted mb-6 flex-1 line-clamp-3">{post.content.substring(0, 100)}...</p>
                                        <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-primary font-semibold hover:text-secondary transition-colors mt-auto">Read Article &rarr;</Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
