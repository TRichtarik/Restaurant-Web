import React, { FC } from 'react';

export type TextComponentProps = {
    message: string;
};

export const TextComponent : FC<TextComponentProps> = ({message}: TextComponentProps) => {
    return (
        <div className='flex items-center justify-center h-screen container mx-auto my-auto p-5 text-4xl'>
            <p className='text-center' >
                {message}
            </p>
        </div> 
    )
}


