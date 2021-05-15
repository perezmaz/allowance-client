/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import NoAvatar from '../assets/img/user.png';
import useAuth from '../hooks/useAuth';
import useMessage from '../hooks/useMessage';

const UploadAvatar = ({ avatar, setAvatar, name }) => {
  const { user } = useAuth();

  const { t } = useTranslation();

  const { openNotificationMessage } = useMessage();

  const onDrop = useCallback(
    acceptedFiles => {
      const file = acceptedFiles[0];
      if (file) {
        setAvatar({ name, file, preview: URL.createObjectURL(file) });
      } else {
        openNotificationMessage('danger', t('profile.message.-6'));
      }
    }, [setAvatar],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/jpeg, image/png, image/jpg',
    noKeyboard: true,
    minSize: 0,
    maxSize: 1048576,
    onDrop,
  });

  return (
    <>
      <div className="upload-avatar" {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <img src={NoAvatar} alt="Avatar" className="avatar" />
        ) : (
          <img src={avatar || NoAvatar} alt="Avatar" className="avatar" />
        )}
      </div>
      <h5 className="text-center text-primary">
        {t('welcome', { name: user.name })}
      </h5>
      <h6 className="text-center text-secondary fs13 mb-5">
        {t('welcome.message')}
      </h6>
    </>
  );
};

export default UploadAvatar;
