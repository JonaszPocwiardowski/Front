import React, { useState } from 'react';
import { Modal, Button } from 'flowbite-react';

function NotificationModal({ isOpen, onClose, notifications, markAsRead, readNotifications }) {
  const [selectedNotif, setSelectedNotif] = useState(null);

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Powiadomienia</Modal.Header>
      <Modal.Body>
        {selectedNotif ? (
          <div>
            <p className="text-sm text-gray-500">{selectedNotif.day}-{selectedNotif.month}-{selectedNotif.year} {selectedNotif.hour}:{selectedNotif.minute}</p>
            <p className="text-lg font-medium mt-2">{selectedNotif.message}</p>
            <Button onClick={() => setSelectedNotif(null)} className="mt-4">Powrót</Button>
          </div>
        ) : (
          <ul className="space-y-2">
            {notifications.map((notif) => (
              <li
                key={notif.id}
                onClick={() => {
                  setSelectedNotif(notif);
                  markAsRead(notif.id);
                }}
                className={`p-2 border-b cursor-pointer transition-all duration-200 ${
                  readNotifications.has(notif.id) ? 'text-gray-600' : 'text-black font-bold bg-blue-100'
                } hover:bg-blue-200`}
              >
                {notif.day}-{notif.month}-{notif.year} {notif.hour}:{notif.minute}
              </li>
            ))}
          </ul>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>Zamknij</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NotificationModal;


