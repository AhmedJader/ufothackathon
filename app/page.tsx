import Hero from '@/components/chatbot.jsx';
export default function Home() {
  return (

    <div className="flex flex-col items-center justify-start h-full">
      <div className=''>
        <h1 className='text-3xl mr-20'>Home Page</h1>
      </div>

      <Hero />
    </div>
  );
}
