export default function MessageBubble({ message, isUser }: { message: string, isUser: boolean }) {
  return (
    <div className={`p-3 rounded-xs max-w-xs ${isUser ? 'bg-cyan-500 text-white self-end' : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 self-start'}`}>
      {message}
    </div>
  );
}