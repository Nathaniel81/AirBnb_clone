import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { IImage } from '@/types';
import { MdKeyboardBackspace } from "react-icons/md";


const PropertyPhotos = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const images = location.state.images.map((image: IImage) => ({
    original: image.image_url,
    thumbnail: image.image_url,
  }));

  return (
    <div className="w-full mx-auto mt-10 mb-12 px-4 lg:px-0">
      <span className="font-medium text-2xl mb-5 hover:text-red-500 cursor-pointer transform transition inline-block"
        onClick={() => navigate(-1)}>
        <MdKeyboardBackspace />
      </span>
      <ImageGallery items={images} />
    </div>
  );
};

export default PropertyPhotos;
