import React from 'react';
import SectionTitle from '../../components/SectionTitle';
import { useSelector } from 'react-redux';

function Contact() {
    const { portfolioData } = useSelector(state => state.root);
    const { contact } = portfolioData;

    if (!contact || contact.length === 0) {
        return null; // Hide the component if projects data is not available
      }

    return (
        <div>
            <SectionTitle title="Say Hello" />
            <div className="flex sm:flex-col items-center justify-between">
                <div className="flex flex-col gap-1">
                    <p className="text-white">{'{'}</p>

                    {Object.keys(contact).map((key) => (
                        <p className="ml-5 ">
                            <span className="text-[#a8dfe0] ">{key}:</span> {" "}
                            <span className="text-[#a8dfe0]">{contact[key]}</span>,
                        </p>
                    ))}

                    <p className="text-white ">{'}'}</p>
                </div>
                <div className="h-[400px]">
                    <lottie-player src="https://lottie.host/219c0a00-4ea9-4c4a-90d0-3664a93ff2d8/4rbrXvqTpx.json" background="##ffffff" speed="1" loop autoplay direction="1" mode="normal"></lottie-player>
                </div>
            </div>
        </div>
    );
}

export default Contact;
