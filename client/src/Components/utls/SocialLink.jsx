import PropTypes from 'prop-types';
const SocialLink = ({ icon }) => {
  return (
    <div>
      <img src={icon} alt="icon/social"
      className='w-8 h-8 flex items-center cursor-pointer md:w-6 md:h-6 '
      />
    </div>
  )
}

SocialLink.propTypes = {
  icon: PropTypes.string.isRequired,
};
export default SocialLink
