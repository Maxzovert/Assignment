import { motion } from 'framer-motion';
import { User, Mail, Calendar } from 'lucide-react';
import { format } from 'date-fns';

const ProfileCard = ({ user }) => {
  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-effect rounded-xl p-6 dashboard-reveal"
    >
      <div className="text-center mb-6">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold shadow-lg"
        >
          {user.name?.charAt(0).toUpperCase() || 'U'}
        </motion.div>
        <h3 className="text-xl font-bold text-gray-800 mb-1">{user.name}</h3>
        <p className="text-sm text-gray-600">{user.email}</p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3 text-gray-600">
          <User className="w-5 h-5 text-primary-500" />
          <span className="text-sm">{user.name}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-600">
          <Mail className="w-5 h-5 text-primary-500" />
          <span className="text-sm truncate">{user.email}</span>
        </div>
        {user.createdAt && (
          <div className="flex items-center gap-3 text-gray-600">
            <Calendar className="w-5 h-5 text-primary-500" />
            <span className="text-sm">
              Joined {format(new Date(user.createdAt), 'MMM yyyy')}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProfileCard;

