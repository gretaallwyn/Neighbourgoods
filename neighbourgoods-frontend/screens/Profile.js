const ProfileScreen = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [profilePicture, setProfilePicture] = useState(user.profilePicture);

  const handleProfileUpdate = async () => {
    // Call API to update the profile
  };

  return (
    <View>
      <TextInput value={name} onChangeText={setName} placeholder="Name" />
      <Button title="Update Profile" onPress={handleProfileUpdate} />
    </View>
  );
};
