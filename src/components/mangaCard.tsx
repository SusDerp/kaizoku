import { ActionIcon, Badge, Code, createStyles, Paper, Text, Title } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { IconX } from '@tabler/icons';

const useStyles = createStyles((theme, _params, getRef) => ({
  card: {
    position: 'relative',
    height: 350,
    width: 210,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundSize: 'cover',
    backgroundPosition: 'center',

    transition: 'transform 150ms ease, box-shadow 150ms ease',

    '&:hover': {
      transform: 'scale(1.01)',
      boxShadow: theme.shadows.md,
    },
    [`&:hover .${getRef('removeButton')}`]: {
      display: 'flex',
    },
  },
  removeButton: {
    ref: getRef('removeButton'),
    position: 'absolute',
    right: -5,
    top: -5,
    display: 'none',
  },
  title: {
    fontFamily: `${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    wordBreak: 'break-word',
    marginTop: theme.spacing.xs,
  },

  interval: {
    textTransform: 'uppercase',
  },
}));

interface ArticleCardImageProps {
  cover: string;
  title: string;
  interval: string;
  onRemove: () => void;
  onClick: () => void;
}

const createRemoveModal = (title: string, onRemove: () => void) => {
  const openRemoveModal = () =>
    openConfirmModal({
      title: `Remove ${title}?`,
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to remove
          <Code className="text-base font-bold" color="red">
            {title}
          </Code>
          ? This action is destructive and all downloaded files will be removed
        </Text>
      ),
      labels: { confirm: 'Remove', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: onRemove,
    });

  return openRemoveModal;
};

export function MangaCard({ cover, title, interval, onRemove, onClick }: ArticleCardImageProps) {
  const { classes } = useStyles();
  const removeModal = createRemoveModal(title, onRemove);

  return (
    <Paper
      onClick={onClick}
      shadow="lg"
      p="md"
      radius="md"
      sx={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2)), url(${cover})`,
      }}
      className={classes.card}
    >
      <ActionIcon
        color="red"
        variant="filled"
        radius="xl"
        className={classes.removeButton}
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          e.stopPropagation();
          removeModal();
        }}
      >
        <IconX size={16} />
      </ActionIcon>
      <div>
        <Badge color="teal" variant="filled" className={classes.interval} size="md">
          {interval}
        </Badge>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </div>
    </Paper>
  );
}
