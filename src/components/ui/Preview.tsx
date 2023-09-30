import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import Spinner from '../../assets/Spinner';
import { CheckResponse } from '../../api/sendPhoto';
import { useEffect } from 'react';

interface Props {
  size: 'sm' | 'lg';
  img: File;
  verifyStatus: CheckResponse | false | undefined | null;
}

export default function Preview({ size, verifyStatus, img }: Props) {
  useEffect(() => {
    console.log(verifyStatus);
  }, [verifyStatus]);

  return (
    <label
      htmlFor="photo"
      className="flex flex-col items-center justify-center"
    >
      {verifyStatus !== null && (
        <div className="bg-opacity-50 bg-black absolute rounded-xl">
          {verifyStatus === undefined ? (
            <>
              <Spinner />
            </>
          ) : (
            <>
              {verifyStatus === false ? (
                <XCircleIcon className="text-white w-24" />
              ) : (
                <>
                  {verifyStatus.Status === 'Ok' ? (
                    <CheckCircleIcon className="text-green-400 w-24" />
                  ) : (
                    <>
                      {verifyStatus.Status === 'Failed' ? (
                        <XCircleIcon className="text-red-400 w-24" />
                      ) : (
                        <ExclamationCircleIcon className="text-yellow-400 w-24" />
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      )}

      <img
        id="photo"
        src={URL.createObjectURL(img)}
        width={size === 'sm' ? 200 : 700}
        height={size === 'lg' ? 100 : 500}
        alt={'photo'}
        className="rounded-xl"
      />
    </label>
  );
}
