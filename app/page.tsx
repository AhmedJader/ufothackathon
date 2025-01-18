import Hero from '@/components/chatbot.jsx';
export default function Home() {
  return (

    <div className="flex flex-col items-center justify-start h-full">
      <div className="flex items-center justify-center h-full">
      <h1 className="text-2xl">Home</h1>
    </div>

      <Hero />
    </div>
  );
}
