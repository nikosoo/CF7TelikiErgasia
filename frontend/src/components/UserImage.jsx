const UserImage = ({ image, size }) => {
  return (
    <div>
      <img
        className="object-cover rounded-full"
        width={size}
        height={size}
        alt="user"
        src={`http://localhost:3000/assets/${image}`}
      />
    </div>
  );
};

export default UserImage;
