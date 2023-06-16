import ProfileTitle from "../profileTitle/ProfileTitle";

function FollowerList(props) {
  const { followerList } = props;
  const profileDummy = [
    {
      name: "Nitin Sharma",
      about: "10x Top Writer, Developer. Get in touch: linktr.ee/nitinfab. Support me: https://ko-fi.com/nitinfab"
    },
    {
      name: "Nir Eyal",
      about:
        "Posts may contain affiliate links to my two books, “Hooked” and “Indistractable.” Get my free 80-page guide to being Indistractable at: NirAndFar.com"
    },
    {
      name: "Natasha MH",
      about: "Top Writer in Music, Travel, Inspiration, Life Lessons, Movies and Culture. Works bio.link/alexgustav"
    },
    {
      name: "Jerry Keszka",
      about:
        "Content creator sharing the tools and methods helping you to succeed in a digital economy. Never miss a new story - https://medium.com/@jkeszka/subscribe"
    },
    {
      name: "Matt Croak Code",
      about: "📱 Software Engineer 👨🏻‍💻 Blogger 🪴 Plant Dad https://linktr.ee/mattcroak"
    },
    {
      name: "Choco",
      about: "Life should have many experiences"
    },
    {
      name: "Ishrat Umar",
      about: "Web Developer || Technical Writer || Work with me: ishratumar18@gmail.com"
    },
    {
      name: "Kristina God",
      about:
        "Marketing Professional, Top Writer, Mompreneur, Content Creator. Learn how to make money online. Start here ➜⚡ https://kristinagod.substack.com/ ⚡"
    },
    {
      name: "Vinod Sharma",
      about:
        "I talk about time management🕒 and trends to help web developers level up their career & boost earnings! 🌐📈| Web dev pro w/23+ yrs exp. https://vinodsharma.com"
    },
    {
      name: "FranMorelandJohnssdfsdfsdfsdfsdfsdfsdfsdf",
      about:
        "Lifelong newspaper & magazine writer, author, blogger at franjohns.net, agitator for justice, kindness & interfaith understanding."
    }
  ];

  return (
    <div className="follower-list">
      {profileDummy.map((profile) => (
        <ProfileTitle name={profile.name} about={profile.about} onClickButton={{}} />
      ))}
    </div>
  );
}

export default FollowerList;
