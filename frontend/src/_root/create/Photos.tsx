import CreationBottomBar from "@/components/CreationBottomBar";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { BiTrash } from "react-icons/bi";
import { IoIosImages } from "react-icons/io";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";


const Photos = () => {
    const [photos, setPhotos] = useState<File[]>([]);
    const fileInput = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        fileInput.current?.click();
    };

    const handleUploadPhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPhotos = e.target.files;
        if (newPhotos) {
          const newPhotosArray = Array.from(newPhotos);
          setPhotos((prevPhotos) => [...prevPhotos, ...newPhotosArray]);
        }
      };

    const handleDragPhoto = (result: DropResult) => {
      if (!result.destination) return;

      const items = Array.from(photos);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      setPhotos(items);
    };

    const handleRemovePhoto = (indexToRemove: number) => {
      setPhotos((prevPhotos) =>
        prevPhotos.filter((_, index) => index !== indexToRemove)
      );
    };

    return (
        <>
          <div className="w-3/5 mx-auto mt-10">
            <h2 className="text-3xl font-semibold tracking-tight transition-colors mb-10">
            Add some photos of your place
            </h2>
          </div>
    
          <div className="w-3/5 mx-auto mb-36">
            <div className="mb-5">
              <DragDropContext onDragEnd={handleDragPhoto}>
                <Droppable droppableId="photos" direction="vertical">
                    {(provided) => (
                    <div
                      className={`photos ${
                        photos.length < 1 ? "flex justify-center items-center border rounded-xl" : "grid grid-cols-2 md:grid-cols-3 gap-4"
                      }`}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                        {photos.length < 1 && (
                        <div className="flex flex-col items-center justify-center cursor-pointer p-6 md:p-8 lg:p-10">
                          <input
                            id="image"
                            type="file"
                            ref={fileInput}
                            style={{ display: "none" }}
                            accept="image/*"
                            onChange={handleUploadPhotos}
                            multiple
                          />
                          <label htmlFor="image" className="">
                            <div className="flex flex-col items-center justify-center text-center h-40">
                              <IoIosImages size={200} />
                              <h3 className="base-medium text-lg font-semibold">
                                Upload Your Images
                              </h3>
                              <p className="small-regular text-gray-400 my-1">SVG, PNG, JPG, WEBP</p>
                              <Button type="button" onClick={handleClick} >
                                Select from your device
                              </Button>
                            </div>
                          </label>
                        </div>
                        )}

                        {photos.length >= 1 && (
                        <>
                          {photos.map((photo, index) => (
                            <Draggable
                              key={index}
                              draggableId={index.toString()}
                              index={index}>
                              {(provided) => (
                              <div
                                className="photo relative"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}>
                                <img
                                  src={URL.createObjectURL(photo)}
                                  alt="place"
                                  className="w-full h-auto"
                                />
                                <button
                                  type="button"
                                  className="absolute top-2 right-2 bg-white rounded-full p-1"
                                  onClick={() => handleRemovePhoto(index)}>
                                  <BiTrash size={25} />
                                </button>
                              </div>
                            )}
                            </Draggable>
                          ))}
                          <input
                            id="image"
                            ref={fileInput}
                            type="file"
                            style={{ display: "none" }}
                            accept="image/*"
                            onChange={handleUploadPhotos}
                            multiple
                          />
                          <label htmlFor="image" className="alone">
                            <div className="flex flex-col items-center justify-center text-center h-40">
                              <IoIosImages size={200} />
                              <h3 className="base-medium text-lg font-semibold">
                                Upload Your Images
                              </h3>
                              <p className="small-regular text-gray-400 my-1">SVG, PNG, JPG, WEBP</p>
                              <Button type="button" onClick={handleClick} >
                                Select from your device
                              </Button>
                            </div>
                          </label>
                        </>
                        )}
                      {provided.placeholder}
                    </div>
                    )}
                </Droppable>
              </DragDropContext>
            </div>
          </div>
          
          <CreationBottomBar step={5} photos={photos} />
        </>
      );
    }
        

export default Photos