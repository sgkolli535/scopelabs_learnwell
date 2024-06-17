import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';

// CreateVideoModal component
// This component renders a modal to create a new video
// It includes input fields for the video title, description, and video URL
// It also includes buttons to close the modal and create the video
export const CreateVideoModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const userId = "sumi_kolli";

  // handle submit event to create a new video
  // sends a POST request to the API to create a new video
  // resets the input fields after creating the video
  const handleSubmit = async () => {
    const payload = {
      user_id: userId,
      description: description,
      video_url: videoUrl,
      title: title,
    };

    try {
      const response = await fetch('https://take-home-assessment-423502.uc.r.appspot.com/api/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Video created successfully:', data);
      setTitle('');
      setDescription('');
      setVideoUrl('');
    } catch (error) {
      console.error('Error creating video:', error);
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      placement="center"
    >
      <ModalContent>
        {(onClose: any) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Create a New Video</ModalHeader>
            <ModalBody>
              <Input
                label="Video Title"
                placeholder="Enter the video title"
                variant="bordered"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Input
                label="Description"
                placeholder="Enter the video description"
                variant="bordered"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Input
                label="Video URL"
                placeholder="Enter the video url"
                variant="bordered"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={handleSubmit}>
                Create
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

// CreateVideoButton component
// This component renders a button to open the CreateVideoModal
// It includes an onClick event to open the modal
// it is present on the Navbar to create a new video
export const CreateVideoButton: React.FC<{ onOpen: () => void }> = ({ onOpen }) => {
  return (
    <Button onPress={onOpen} className="bg-custom-green text-white">
      Create Video
    </Button>
  );
};

