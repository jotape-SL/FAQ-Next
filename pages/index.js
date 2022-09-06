import NextLink from 'next/link';
import { Box, Text, Image } from '@skynexui/components';
import dados from '../dados.json';

export default function HomeScreen() {
  const infos = {
    nome: 'Peter Parker',
  };
  const posts = dados.posts;

  return (
    <Box
      styleSheet={{
        flexDirection: 'column',
        margin: '32px auto',
        maxWidth: '800px',
        paddingHorizontal: '16px',
      }}
    >
      <Image
        src={`https://br.atsit.in/wp-content/uploads/2021/12/o-homem-aranha-peter-parker-morre-no-no-way-home.jpg`}
        styleSheet={{
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          margin: '0 auto',
          border: '2px solid #0008fa',
          objectFit: 'cover',
        }}
      />
      <Text
        variant='heading1'
        tag='h1'
        styleSheet={{ color: '#f73434', justifyContent: 'center' }}
      >
        {infos.nome}
      </Text>

      <Box
        styleSheet={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          marginTop: '16px',
          gridGap: '16px',
        }}
      >
        {posts.map(({ title, content, id }) => (
          <Post key={id} title={title} content={content} id={id} />
        ))}
      </Box>
    </Box>
  );
}

function Post({ title, content, id }) {
  return (
    <NextLink href={`posts/${id}`} passHref>
      <Box
        styleSheet={{
          flexDirection: 'column',
          border: '1px solid #0008fa',
          padding: '16px',
          boxShadow: '1px 1px 5px 0 rgba(255,69,0,0.2)',
          transition: '.3s',
          borderRadius: '4px',
          hover: {
            boxShadow: '1px 1px 5px 5px rgba(0,8,250,0.2)',
            cursor: 'pointer',
          },
        }}
      >
        <Text
          tag='a'
          variant='heading4'
          styleSheet={{
            display: ' block',
            color: '#f73434',
            marginBottom: '8px',
          }}
        >
          {title}
        </Text>
        <Text>{content.substring(0, 140)}...</Text>
      </Box>
    </NextLink>
  );
}
