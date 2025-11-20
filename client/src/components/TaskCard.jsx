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
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="glass-effect rounded-xl p-6 card-hover"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{task.title}</h3>
          {task.description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{task.description}</p>
          )}
        </div>
        <div className="flex gap-2 ml-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onEdit(task)}
            className="p-2 rounded-lg bg-primary-100 text-primary-600 hover:bg-primary-200 transition-colors"
          >
            <Edit className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(task._id)}
            className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[task.status]}`}
        >
          {task.status.replace('-', ' ')}
        </span>
        <span className={`flex items-center gap-1 text-sm ${priorityColors[task.priority]}`}>
          <Flag className="w-4 h-4" />
          {task.priority}
        </span>
        {task.dueDate && (
          <span className="flex items-center gap-1 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            {format(new Date(task.dueDate), 'MMM dd, yyyy')}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default TaskCard;

