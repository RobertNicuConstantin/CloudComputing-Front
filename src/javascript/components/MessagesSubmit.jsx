import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { LANGUAGES_ARRAY, DEFAULT_MAIL } from '../utils/constants';

function MessagesSubmit() {

    const [languageDropdown, setLanguageDropdown] = useState("");

    const handleMessageSend = async (e) => {
        setLanguageDropdown(e.target.value)
        const language = e.target.value;
        const senderName = document.getElementById('senderName').value;
        const receiverMail = document.getElementById('receiverMail').value;
        const messageContent = document.getElementById('messageContent').value;

        try {
            let response = await axios.post(
                `${process.env.REACT_APP_API_URL}/messages/foreign`,
                {
                    language,
                    senderName,
                    senderMail: DEFAULT_MAIL,
                    receiverMail,
                    messageContent
                });

                if(response.status === 200) {
                    alert(`Your original messages was in ${response.data.translationData.originalLanguage}. \nMessage sent: ${response.data.translationData.translatedText}`);
                }
        }
        catch (error) {
            alert('Something went wrong');
            console.log(error);
        }
    }

    
    return (
        <div id="MessagesSubmit">
            <div className='text-2xl font-bold mb-4'>Send a message</div>
            <form className="w-full max-w-lg">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="senderName">
                            Your name
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="senderName" type="text" placeholder="Nicu" />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="receiverMail">
                            Receiver mail
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="receiverMail" type="text" placeholder="nicu@mail.com" />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="messageContent">
                            Your message
                        </label>
                        <textarea
                            rows={4}
                            name="comment"
                            id="messageContent"
                            className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-900 rounded-md p-5"
                            placeholder={'Type your text and select the language!'} />
                    </div>
                </div>
            </form>

            {/* Create a button for each language from LANGUAGES_ARRAY */}
            {/* {LANGUAGES_ARRAY.map((language, index) => {
                return (
                    <button
                        key={index}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2 capitalize"
                        onClick={handleMessageSend}
                        value={language}>
                        {language.toLowerCase()}
                    </button>
                )
            })} */}

                {/* added */}

                <div className='text-2xl font-bold mb-4'>Select a language</div>

                <select onChange={handleMessageSend}>
                    <option value="Select a language">Language</option>
                    {LANGUAGES_ARRAY.map((lang) => <option value={lang}>{lang.toLocaleLowerCase().charAt(0).toUpperCase() + lang.slice(1).toLocaleLowerCase()}</option>)}
                </select>
        </div>
    );
}

export default MessagesSubmit;