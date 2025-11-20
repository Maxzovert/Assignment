import { motion } from 'framer-motion';
import { Edit, Trash2, Calendar, Flag } from 'lucide-react';
import { format } from 'date-fns';

const TaskCard = ({ task, onEdit, onDelete, index }) => {
  const statusColors = {
    pending: 'bg-orange-100 text-orange-700 border-orange-200',
    'in-progress': 'bg-blue-100 text-blue-700 border-blue-200',
    completed: 'bg-green-100 text-green-700 border-green-200',
  };

  const priorityColors = {
    low: 'text-gray-500',
    medium: 'text-yellow-500',
    high: 'text-red-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
      whileHover={{ y: -4 }}
      className="glass-effect-strong rounded-2xl p-6 card-hover group relative overflow-hidden border border-gray-100 dark:border-gray-700"
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 via-primary-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 pr-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {task.title}
          </h3>
          {task.description && (
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2 leading-relaxed">
              {task.description}
            </p>
          )}
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onEdit(task)}
            className="p-2.5 rounded-xl bg-primary-50 text-primary-600 hover:bg-primary-100 transition-all shadow-sm hover:shadow-md"
            title="Edit task"
          >
            <Edit className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(task._id)}
            className="p-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-all shadow-sm hover:shadow-md"
            title="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-gray-100 dark:border-gray-700">
        <span
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-2 ${statusColors[task.status]} shadow-sm`}
        >
          {task.status.replace('-', ' ')}
        </span>
        <span className={`flex items-center gap-1.5 text-sm font-medium px-2.5 py-1 rounded-lg ${priorityColors[task.priority]} bg-gray-50 dark:bg-gray-800`}>
          <Flag className="w-3.5 h-3.5" />
          {task.priority}
        </span>
        {task.dueDate && (
          <span className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300 font-medium px-2.5 py-1 rounded-lg bg-gray-50 dark:bg-gray-800">
            <Calendar className="w-3.5 h-3.5" />
            {format(new Date(task.dueDate), 'MMM dd, yyyy')}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default TaskCard;

