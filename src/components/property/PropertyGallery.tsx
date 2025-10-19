
import MissingImagePlaceholder from '@/components/ui/MissingImagePlaceholder';

interface PropertyGalleryProps {
  images?: string[];
  title?: string;
}

const PropertyGallery = ({ images, title }: PropertyGalleryProps) => {
  if (!images || images.length === 0) {
    return (
      <div className="mb-8 rounded-xl overflow-hidden border border-estate-neutral-200">
        <MissingImagePlaceholder className="w-full h-[500px] object-cover" />
      </div>
    );
  }

  // Modern grid when we have at least 5 images
  if (images.length >= 5) {
    const [first, ...rest] = images;
    const grid = rest.slice(0, 4);
    return (
      <div className="mb-8 grid grid-cols-4 grid-rows-2 gap-2">
        <div className="col-span-2 row-span-2 rounded-xl overflow-hidden">
          <img src={first} alt={title} className="w-full h-full object-cover" />
        </div>
        {grid.map((img, idx) => (
          <div key={idx} className="rounded-xl overflow-hidden">
            <img src={img} alt={`${title} ${idx + 2}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    );
  }

  // Fallback to simple layout
  return (
    <div className="mb-8">
      <div className="rounded-xl overflow-hidden">
        <img src={images[0]} alt={title} className="w-full h-[500px] object-cover" />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2 mt-2">
          {images.slice(1).map((img, index) => (
            <div key={index} className="rounded-xl overflow-hidden">
              <img src={img} alt={`${title} ${index + 2}`} className="w-full h-32 object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyGallery;
