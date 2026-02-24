import React from 'react';
import { useTranslation } from '../context/LanguageContext';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogData';

const BlogPreview = () => {
  const { t, language } = useTranslation();

  // Show only featured posts on home page
  const featuredPosts = blogPosts.filter(post => post.featured);

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
              <div className="relative h-56 md:h-64 overflow-hidden">
                <img src={post.image} alt={post[`title_${language}`]} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between text-sm text-text-muted mb-4">
                  <span className="flex items-center gap-1.5"><Calendar size={14} /> {post.date}</span>
                  <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full font-semibold text-xs">{post[`category_${language}`]}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-text leading-tight">{post[`title_${language}`]}</h3>
                <p className="text-text-muted mb-6 flex-1 line-clamp-3">{post[`excerpt_${language}`]}</p>
                <Link to="/blog" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-secondary hover:gap-3 transition-all mt-auto whitespace-nowrap w-fit">
                  {t('blog.readMore')} <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
