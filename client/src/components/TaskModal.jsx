import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { taskAPI } from '../services/api';
import toast from 'react-hot-toast';

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  status: z.enum(['pending', 'in-progress', 'completed']),
  priority: z.enum(['low', 'medium', 'high']),
  dueDate: z.string().optional(),
});

const TaskModal = ({ task, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const isEditing = !!task;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task?.title || '',
      description: task?.description || '',
      status: task?.status || 'pending',
      priority: task?.priority || 'medium',
      dueDate: task?.dueDate ? task.dueDate.split('T')[0] : '',
    },
  });

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description || '',
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
      });
    }
  }, [task, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (isEditing) {
        await taskAPI.updateTask(task._id, data);
        toast.success('Task updated successfully');
      } else {
        await taskAPI.createTask(data);
        toast.success('Task created successfully');
      }
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-effect-strong rounded-3xl p-8 w-full max-w-lg shadow-strong"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {isEditing ? 'Edit Task' : 'Create New Task'}
            </h2>
            <motion.button
              whileHover={{ rotate: 90, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </motion.button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2.5">
                Title <span className="text-red-500 dark:text-red-400">*</span>
              </label>
              <input
                {...register('title')}
                type="text"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all shadow-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="Enter task title"
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400 font-medium">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2.5">
                Description
              </label>
              <textarea
                {...register('description')}
                rows="4"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none resize-none transition-all shadow-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="Enter task description (optional)"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2.5">
                  Status
                </label>
                <select
                  {...register('status')}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all shadow-sm font-medium text-gray-700 dark:text-gray-200 cursor-pointer"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2.5">
                  Priority
                </label>
                <select
                  {...register('priority')}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all shadow-sm font-medium text-gray-700 dark:text-gray-200 cursor-pointer"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2.5">
                Due Date
              </label>
              <input
                {...register('dueDate')}
                type="date"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all shadow-sm font-medium text-gray-700 dark:text-gray-200"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <motion.button
                type="button"
                onClick={onClose}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-4 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all font-semibold shadow-sm"
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-4 py-3.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                {loading ? 'Saving...' : isEditing ? 'Update Task' : 'Create Task'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TaskModal;

