
import MissingImagePlaceholder from '@/components/ui/MissingImagePlaceholder';

interface PropertyGalleryProps {
  images?: string[];
  title?: string;
}

const PropertyGallery = ({ images, title }: PropertyGalleryProps) => {
  return (
    <div className="mb-8">
      {(!images || images.length === 0) ? (
        <div className="rounded-lg overflow-hidden"> {/* Optional: keep consistent styling wrapper */}
          <MissingImagePlaceholder className="w-full h-[500px] object-cover" />
        </div>
      ) : (
        <>
          <div className="rounded-lg overflow-hidden">
            <img 
              src={images[0]} 
              alt={title}
              className="w-full h-[500px] object-cover"
            />
          </div>
          
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2 mt-2">
              {images.slice(1).map((img, index) => (
                <div key={index} className="rounded-lg overflow-hidden">
                  <img 
                    src={img} 
                    alt={`${title} ${index + 2}`}
                    className="w-full h-32 object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PropertyGallery;
