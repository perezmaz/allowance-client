/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react';
import Moment from 'moment';
import { useTranslation } from 'react-i18next';
import {
  Card,
  Button,
  Form,
  Col,
} from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';
import UserPhoto from '../../assets/img/user.png';
import { list, save } from '../../api/message';
import api from '../../config/api';
import useWebSocket from '../../hooks/useWebSocket';

const ChatMessage = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [count, setCount] = useState(0);

  const { t } = useTranslation();

  const { user } = useAuth();

  const { newMessage, sendChatNotification } = useWebSocket();

  const timeLeft = duration => {
    if (duration.days() > 0) {
      return t('date.days.ago', { days: duration.days() });
    }
    if (duration.hours() > 0) {
      return t('date.hours.ago', { hours: duration.hours() });
    }
    if (duration.minutes() > 0) {
      return t('date.minutes.ago', { minutes: duration.minutes() });
    }
    return t('date.seconds.ago', { seconds: duration.seconds() });
  };

  const mapData = records => (
    records.map(record => {
      const notificationDate = Moment(record.createdAt).unix();
      const currentTime = Moment().unix();
      const duration = Moment.duration((currentTime - notificationDate) * 1000, 'milliseconds');

      return (
        {
          from: record.from,
          message: record.message,
          createdAt: record.createdAt,
          timeLeft: timeLeft(duration),
        }
      );
    })
  );

  useEffect(() => {
    list()
      .then(response => {
        if (response.code === 0) {
          setMessages(mapData(response.result));
        }
      });
  }, [count]);

  useEffect(() => {
    if (newMessage) {
      const updatedMessages = mapData(messages);
      setMessages([
        ...updatedMessages,
        {
          from: newMessage.from,
          message: newMessage.message,
          createdAt: newMessage.createdAt,
          timeLeft: t('date.seconds.ago', { seconds: '0' }),
        },
      ]);
      const element = document.getElementById('message');
      element.focus();
    }
  }, [newMessage]);

  useEffect(() => {
    setTimeout(() => {
      setCount(count + 1);
    }, 60000);
  }, []);

  const onChange = event => {
    const { value } = event.target;
    setMessage(value);
  };

  const sendMessage = async event => {
    event.preventDefault();
    await save({ message });
    window.scrollTo(0, document.body.scrollHeight);
    setMessage('');
    sendChatNotification();
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      sendMessage(event);
    }
  };

  return (
    <Card className="mt-4 min-500">
      <Card.Body className="d-flex flex-column">
        {messages.length > 0 && messages.map((messageRecord, index) => (
          <div
            key={`${messageRecord.from._id}-${index}`}
            className={messageRecord.from._id === user._id ? 'message-out' : 'message-in'}
          >
            <div className="fs-13 text-left mb-3">
              <img
                src={messageRecord.from.avatar ? `${api.HOST}:${api.PORT}/avatar/${messageRecord.from.avatar}` : UserPhoto}
                alt="Avatar"
                className="photo mr-2"
              />
              {messageRecord.from.name}
            </div>
            {messageRecord.message}
            <div className="fs-13 text-right mt-1">{messageRecord.timeLeft}</div>
          </div>
        ))}
      </Card.Body>
      <Card.Footer className="text-right">
        <Form>
          <Form.Row>
            <Col xs={9} sm={10}>
              <Form.Control
                placeholder={t('message.form.control1')}
                value={message}
                onChange={onChange}
                onKeyDown={handleKeyDown}
                id="message"
              />
            </Col>
            <Col xs={2} className="text-right">
              <Button
                variant="primary"
                title={t('action.send')}
                onClick={sendMessage}
              >
                {t('action.send')}
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </Card.Footer>
    </Card>
  );
};

export default ChatMessage;
