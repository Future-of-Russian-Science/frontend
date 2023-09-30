interface Props {
  updateImageFunc: (file: File | undefined) => void;
}

export default function Upload({ updateImageFunc }: Props) {
  return (
    <>
      <div>
        <label htmlFor="upload" className="">
          <div className="flex flex-row items-center justify-between gap-3 px-12 py-3 font-bold rounded-xl transition duration-300 bg-purple-500 text-white hover:bg-purple-700 disabled:bg-gray-300 mt-12">
            Выбрать фото...
          </div>
          <input
            type="file"
            id="upload"
            accept="image/png, image/jpeg"
            className="hidden"
            onChange={(event) => {
              updateImageFunc(event.target.files?.[0]);
            }}
          />
        </label>
      </div>
    </>
  );
}
