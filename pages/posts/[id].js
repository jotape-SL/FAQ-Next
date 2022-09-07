import NextLink from 'next/link';
import { Box, Text } from '@skynexui/components';
import { useRouter } from 'next/router';
import dados from '../../dados.json';

// dica dos paths estáticos
export async function getStaticPaths() {
  // const paths = [
  //   { params: { id: '1' } },
  //   { params: { id: '2' } },
  //   { params: { id: '3' } }
  // ]
  const paths = dados.posts.map((postAtual) => {
    return { params: { id: `${postAtual.id}` } };
  });
  console.log('dados:', dados);
  console.log('paths:', paths);

  return {
    paths: paths,
    fallback: false, // false or 'blocking'
  };
}

export async function getStaticProps(context) {
  console.log('Contexto', context.params.id);
  const id = context.params.id;

  const post = dados.posts.find((currentPost) => {
    if (currentPost.id === id) {
      return true;
    }
    return false;
  });

  console.log(post);

  return {
    props: {
      id: post.id,
      title: post.title,
      date: post.date,
      content: post.content,
      video: post.video,
    },
  };
}

export default function PostByIdScreen(props) {
  // console.log(props);
  const router = useRouter();
  // console.log(router);
  const post = {
    title: props.title,
    date: props.date,
    content: props.content,
    video: props.video,
  };

  if (router.isFallback) {
    return 'Essa página não existe!';
  }

  return (
    <Box
      styleSheet={{
        flexDirection: 'column',
        margin: '32px auto',
        maxWidth: '700px',
        paddingHorizontal: '16px',
      }}
    >
      {/* Cabeçalho */}
      <Text
        variant='heading2'
        tag='h1'
        styleSheet={{
          color: '#d60909',
          justifyContent: 'center',
          lineHeight: '1.2',
        }}
      >
        {post.title}
      </Text>
      <Text
        styleSheet={{
          color: '#d60909',
          justifyContent: 'center',
          borderBottom: '1px solid #d60909',
          paddingVertical: '16px',
          marginVertical: '16px',
        }}
      >
        Lançamento oficial no Brasil: {post.date}
      </Text>

      {/* Área de Conteudo */}
      <Box
        styleSheet={{
          flexDirection: 'column',
        }}
      >
        <Text>{post.content}</Text>

        <iframe
          margin-top='32px'
          height='400px'
          src={post.video}
          title='SPIDER-MAN: INTO THE SPIDER-VERSE - Official Trailer #2 (HD)'
          frameborder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowfullscreen
        ></iframe>
      </Box>

      {/* Rodapé */}
      <Box
        styleSheet={{
          marginTop: '16px',
          paddingVertical: '16px',
          borderTop: '1px solid #d60909',
          color: '#d60909',
        }}
      >
        <NextLink href='/' passHref>
          <Text
            tag='a'
            styleSheet={{
              hover: { textDecoration: 'underline' },
              cursor: 'pointer',
            }}
          >
            Voltar para a home
          </Text>
        </NextLink>
      </Box>
    </Box>
  );
}
