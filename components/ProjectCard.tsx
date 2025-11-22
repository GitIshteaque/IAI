import React from 'react';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group relative cursor-pointer overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
      <div className="aspect-[3/4] md:aspect-[4/5] overflow-hidden relative">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"/>
      </div>
      
      <div className="p-6 relative">
        <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-2 group-hover:translate-y-0">
           <ArrowUpRight size={20} className="text-neutral-900 dark:text-white"/>
        </div>
        
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-3 block">
          {project.category}
        </span>
        <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{project.title}</h3>
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
           <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">{project.location}</p>
           <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">{project.year}</p>
        </div>
      </div>
    </div>
  );
};