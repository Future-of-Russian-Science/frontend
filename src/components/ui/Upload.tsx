import { useCallback, useState } from 'react';
import { CheckResponse, sendImages } from '../../api/sendPhoto';
import { Button } from '../Button';
import Preview from './Preview';

export default function Upload() {
  const [images, setImages] = useState<FileList | null>(null);
  const [verifyStatuses, setVerifyStatuses] = useState<
    CheckResponse[] | false | undefined | null
  >(undefined);

  const verify = useCallback(async (images: FileList) => {
    setVerifyStatuses(undefined);
    const response = await sendImages(images);
    setVerifyStatuses(response);
  }, []);

  return (
    <>
      {images && (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {Array.from(images).map((image, index) => (
            <Preview
              img={image}
              size="sm"
              verifyStatus={
                !verifyStatuses ? verifyStatuses : verifyStatuses[index]
              }
              key={index}
            />
          ))}
        </div>
      )}

      <div className="mt-4 flex flex-row items-center justify-center gap-6">
        {!images ? (
          <div>
            <label htmlFor="upload">
              <div className="flex flex-row items-center justify-between gap-3 px-12 py-3 font-bold rounded-xl transition duration-300 bg-black text-white hover:bg-gray-900 disabled:bg-gray-500 mt-12">
                Загрузи фото...
              </div>
              <input
                type="file"
                id="upload"
                multiple={true}
                accept="image/png, image/jpeg"
                className="hidden"
                onChange={(event) => {
                  setImages(event.target.files);
                }}
              />
            </label>
          </div>
        ) : (
          <Button
            variant={'default'}
            size={'lg'}
            onClick={() => {
              setImages(null);
            }}
          >
            Очистить
          </Button>
        )}

        {images && (
          <Button
            onClick={() => {
              verify(images);
            }}
          >
            Отправить
          </Button>
        )}
      </div>
    </>
  );
}
