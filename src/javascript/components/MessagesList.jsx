import React, { useEffect, useState } from 'react';
import { UserIcon } from '@heroicons/react/solid'
import axios from 'axios';

// const initialMessages = [
//     {
//         entryID: 1,
//         senderName: 'John Doe',
//         receiverMail: 'john@mail.com',
//         messageContent: 'Hello, how are you?',
//     },
// ];

function MessagesList() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                `http://localhost:8080/messages`,
            );


            if (result.data.messages) {
                let messagesArray = result.data.messages;
                messagesArray.reverse();
                setMessages(result.data.messages);
            }
        };

        fetchData();
    }, []);

    return (
        <div id="MessagesList">
            <div className='text-2xl font-bold mb-4'>Latest messages</div>
            <ul className="-mb-8 max-h-96 overflow-auto">
                {messages.length ? messages.map((message, messageIdx) => (
                    <li key={message.entryID}>
                        <div className="relative pb-8">
                            {messageIdx !== messages.length - 1 ? (
                                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                            ) : null}
                            <div className="relative flex space-x-3">
                                <span
                                    className={'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white bg-violet-900'}>
                                    <UserIcon className="h-5 w-5 text-white" aria-hidden="true" />
                                </span>
                                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                    <p className="text-sm text-gray-500">
                                        <span className="font-medium text-gray-900">
                                            {message.senderName}
                                        </span>
                                        <span className="font-medium">
                                            {` sent a mail to ${message.receiverMail}: ${message.messageContent}`}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </li>
                )) :
                    <span>No messages yet</span>
                }
            </ul>
        </div>
    );
}

export default MessagesList;