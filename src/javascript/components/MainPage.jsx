import React from 'react';
import Header from './Header';
import MessagesList from './MessagesList';
import MessagesSubmit from './MessagesSubmit';
import Footer from './Footer';

function MainPage() {
    return (
        <div id="MainPage">
            <Header />
                <div className="flex max-w-7xl m-auto px-14 py-24">
                    <div className='w-1/2 pr-5'>
                        <MessagesSubmit />
                    </div>
                    <div className='w-1/2 pl-5'>
                        <MessagesList />
                    </div>
                </div>
            <Footer/>
        </div>
    );
}

export default MainPage;