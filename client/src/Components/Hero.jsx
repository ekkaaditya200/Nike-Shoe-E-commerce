import PropTypes from 'prop-types';
import {Clips,SocialLink} from './index'
const Hero = ({ heroapi: { title, subtitle, btntext, sociallinks, img, videos } }) => {
  return (
    <>
      {/* Nice Gradient */}
      <div className='relative h-auto w-auto flex flex-col'>
        {/* Container */}
        <div className='bg-theme clip-path h-[85vh] lg:h-[75vh] md:h-[65vh] sm:h-[55vh] w-auto absolute top-0 left-0 right-0 opacity-100 z-10'></div>
        <div className='relative opacity-100 grid items-center justify-items-center nike-container z-20'>
          {/* Text Content */}
          <div className='grid items-center justify-items-center mt-28 md:mt-24'>
            <h1 className='text-6xl lg:text-5xl md:text-4xl font-extrabold filter drop-shadow-sm text-slate-200'>{title}</h1>
            <h1 className='text-6xl lg:text-5xl md:text-4xl font-extrabold filter drop-shadow-sm text-slate-200'>{subtitle}</h1>
            <button type='button' className='button-theme bg-slate-200 shadow-slate-200 rounded-xl my-5'>{btntext}</button>
            {/* Video Link */}
            <div className='grid items-center gap-5 md:gap-3 absolute top-[33vh] lg:top-[27vh] left-[11%] xl:left-0 w-auto h-auto'>
              {videos?.map((val, i) => (
                <Clips
                  key={i}
                  imgsrc={val.imgsrc}
                  clip={val.clip}
                />
              ))}
            </div>
            {/* Social Link */}
            <div className='grid items-center absolute top-[33vh] lg:top-[27vh] right-0 gap-3'>
              {sociallinks?.map((val,index)=>{
                return <SocialLink 
                key={index}
                icon={val.icon}
                ></SocialLink>
              })
              }
            </div>
          </div>

          {/* Image Content */}
          <div>
            <img src={img} alt="" className="w-auto h-[45vh] lg:h-[35vh] md:h-[31vh] sm:h-[21vh] xsm:h-[19vh] transitions-theme -rotate-[25deg] hover:rotate-0 cursor-pointer object-fill z-40" />
          </div>

        </div>

      </div >
    </>
  )
}

Hero.propTypes = {
  heroapi: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    btntext: PropTypes.string,
    img: PropTypes.string,
    sociallinks: PropTypes.arrayOf(PropTypes.object),
    videos: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default Hero
