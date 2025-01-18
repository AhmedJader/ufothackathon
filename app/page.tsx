import Hero from '@/components/chatbot.jsx';
export default function Home() {
  return (

    <div className="flex flex-col items-center justify-start h-full">
      <div>
        <h1 className='text-3xl mb-5'>Home</h1>
      </div>
      <div className='flex'>
        <Hero />
      </div>
    </div>
  );
}
