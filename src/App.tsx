import { useState } from 'react';
import { Button } from './components/Button';
import { ArrowUpTrayIcon, CameraIcon } from '@heroicons/react/24/outline';
import Camera from './components/ui/Camera';
import Upload from './components/ui/Upload';

function App() {
  const [uploadMode, setUploadMode] = useState<'webcam' | 'upload' | null>(
    null
  );

  return (
    <div className="flex flex-col items-center justify-start">
      <span className="hidden lg:block -z-10 2xl:text-7xl xl:text-6xl lg:text-5xl text-transparent break-all font-akony absolute bg-clip-text bg-gradient-to-b from-5% from-white via-gray-100 via-20% to-95% to-white">
        ЗАГРУЗИ ФОТОГРАФИЮ СФОТОГРАФИРУЙСЯ ЗАГРУЗИ ФОТОГРАФИЮ ЗАГРУЗИ ФОТОГРАФИЮ
        СФОТОГРАФИРУЙСЯ ЗАГРУЗИ ФОТОГРАФИЮ ЗАГРУЗИ ФОТОГРАФИЮ СФОТОГРАФИРУЙСЯ
        ЗАГРУЗИ ФОТОГРАФИЮ СФОТОГРАФИРУЙСЯ ЗАГРУЗИ ФОТОГРАФИЮ СФОТОГРАФИРУЙСЯ
      </span>

      {/* <h1 className="font-bold text-4xl text-black my-12 font-inter">
        Сделай фотографию или загрузи её
      </h1> */}

      <div className="flex flex-col items-center justify-start h-screen">
        {!uploadMode ? (
          <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-row items-center justify-center gap-16">
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
          </div>
        ) : (
          <>
            {uploadMode === 'webcam' ? (
              <>
                <Camera />
              </>
            ) : (
              <>
                <Upload />
              </>
            )}
          </>
        )}

        <div className="mt-4 flex flex-col items-center justify-center gap-4">
          {uploadMode && (
            <>
              <Button
                variant={'link'}
                size={'md'}
                onClick={() => {
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
