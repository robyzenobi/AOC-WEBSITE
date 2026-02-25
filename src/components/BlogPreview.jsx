import React from 'react';
import { useTranslation } from '../context/LanguageContext';
import { Calendar, ArrowRight, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase';
import { useQuery } from '@tanstack/react-query';

const fetchLatestPosts = async () => {
  const { data, error } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false }).limit(3);
  if (error) throw error;
  return data || [];
};

const BlogPreview = () => {
  const { t } = useTranslation();

  const { data: featuredPosts = [], isLoading } = useQuery({
    queryKey: ['latestBlogPosts'],
    queryFn: fetchLatestPosts,
  });

  return (
    <section className="py-14 md:py-24 bg-surface" id="blog">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex justify-between items-end mb-8 md:mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-text mb-4">{t('nav.blog')}</h2>
            <div className="w-16 h-1 bg-secondary rounded-full"></div>
          </div>
          <Link to="/blog" className="inline-flex whitespace-nowrap shrink-0 items-center gap-2 px-4 py-2 border border-primary text-primary hover:bg-primary/10 rounded-lg text-sm font-semibold transition-colors">
            {t('blog.viewAll')}
          </Link>
        </div>

        {isLoading ? (
          <div className="py-12 flex justify-center items-center gap-3 text-text-muted">
            <Loader className="animate-spin text-primary" size={24} />
            <span>Loading latest insights...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 flex flex-col h-full group"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Link to={`/blog/${post.slug || post.id}`} className="flex flex-col h-full">
                  <div className="relative h-56 md:h-64 overflow-hidden">
                    <img src={post.image || 'https://images.unsplash.com/photo-1595856419342-570a290c01a1?auto=format&fit=crop&q=80&w=800'} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-6 flex flex-col flex-1 pb-4">
                    <div className="flex items-center justify-between text-sm text-text-muted mb-4">
                      <span className="flex items-center gap-1.5"><Calendar size={14} /> {post.created_at ? new Date(post.created_at).toLocaleDateString() : 'Recent'}</span>
                      <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full font-semibold text-xs">{post.category || 'Insights'}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-text leading-tight group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="text-text-muted mb-6 flex-1 line-clamp-3">{post.content ? post.content.replace(/[#*`]/g, '').substring(0, 100) + '...' : ''}</p>
                    <div className="inline-flex items-center gap-2 text-primary font-semibold group-hover:text-secondary group-hover:gap-3 transition-all mt-auto w-fit">
                      {t('blog.readMore')} <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogPreview;
