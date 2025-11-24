import { useEffect } from "react";
import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import useConversation from "../../zustand/useConversation";

const Home = () => {
	const { setSelectedConversation, setMessages, selectedConversation } = useConversation();

	useEffect(() => {
		// Cleanup function: clear conversation state when component unmounts
		return () => {
			setSelectedConversation(null);
			setMessages([]);
		};
	}, [setSelectedConversation, setMessages]);

	return (
		<div className='flex h-[calc(100dvh-2rem)] sm:h-[450px] md:h-[550px] w-full sm:rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			{/* Sidebar - hidden on mobile when chat is selected */}
			<div className={`${selectedConversation ? 'hidden sm:flex' : 'flex'} w-full sm:w-auto`}>
				<Sidebar />
			</div>
			
			{/* Message Container - hidden on mobile when no chat selected */}
			<div className={`${selectedConversation ? 'flex' : 'hidden sm:flex'} w-full`}>
				<MessageContainer />
			</div>
		</div>
	);
};
export default Home;