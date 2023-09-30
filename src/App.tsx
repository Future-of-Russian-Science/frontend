import { useState } from 'react';
import { Button } from './components/Button';
import { ArrowUpTrayIcon, CameraIcon } from '@heroicons/react/24/outline';
import Camera from './components/ui/Camera';
import Upload from './components/ui/Upload';
import { sendPhoto } from './api/sendPhoto';

function App() {
  const [uploadMode, setUploadMode] = useState<'webcam' | 'upload' | null>(
    null
  );
  const [img, setImg] = useState<File | undefined>(undefined);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <span className="-z-10 text-8xl text-transparent break-all font-akony absolute bg-clip-text bg-gradient-to-b from-5% from-white via-gray-100 via-20% to-95% to-white">
        БЕЗОПАСНОСТЬ ЛИШНЕЙ НЕ БЫВАЕТ БЕЗОПАСНОСТЬ ЛИШНЕЙ НЕ БЫВАЕТ БЕЗОПАСНОСТЬ
        ЛИШНЕЙ НЕ БЫВАЕТ БЕЗОПАСНОСТЬ ЛИШНЕЙ НЕ БЫВАЕТ БЕЗОПАСНОСТЬ ЛИШНЕЙ НЕ
        БЫВАЕТ БЕЗОПАСНОСТЬ ЛИШНЕЙ НЕ БЫВАЕТ
      </span>

      {/* <h1 className="font-bold text-4xl text-black my-12 font-inter">
        Сделай фотографию или загрузи её
      </h1> */}

      <div className="flex flex-col items-center justify-center">
        {!uploadMode ? (
          <div className="flex flex-row items-center justify-between gap-16">
            <Button
              onClick={() => setUploadMode('upload')}
              variant={'round'}
              size={'xl'}
            >
              <ArrowUpTrayIcon className="text-white w-7" />
            </Button>

            <Button
              onClick={() => setUploadMode('webcam')}
              size={'xl'}
              variant={'round'}
            >
              <CameraIcon className="text-white w-7" />
            </Button>
          </div>
        ) : (
          <>
            {img ? (
              <>
                <img
                  src={URL.createObjectURL(img)}
                  alt={'photo'}
                  className="rounded-xl"
                />
              </>
            ) : (
              <>
                {uploadMode === 'webcam' ? (
                  <>
                    <Camera updateImageFunc={setImg} img={img} />
                  </>
                ) : (
                  <>
                    <Upload updateImageFunc={setImg} />
                  </>
                )}
              </>
            )}
          </>
        )}

        <div className="mt-4 flex flex-col items-center justify-center gap-4">
          {img && (
            <Button
              onClick={async () => {
                const response = await sendPhoto(img);

                if (!response) {
                  console.log(response);
                  console.log('error');
                }

                console.log(response);
                console.log('finish');
              }}
            >
              Отправить
            </Button>
          )}

          {uploadMode && (
            <>
              {img && (
                <Button
                  size={'md'}
                  onClick={() => {
                    setImg(undefined);
                  }}
                >
                  Еще раз
                </Button>
              )}
              <Button
                variant={'link'}
                size={'md'}
                onClick={() => {
                  setImg(undefined);
                  setUploadMode(null);
                }}
              >
                К выбору
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
