import divider from './divider/divider.html';
import list from './list/list.html';
import button from './button/button.html';
import input from './input/input.html';
import badge from './badge/badge.html';
import radio from './radio/radio.html';
import mswitch from './switch/mswitch.html';
import box from './box/box.html';
import icons from './icons/icons.html';
import link from './link/link.html';

export default {
  title: 'Atoms',
};

export const Divider = () => divider;
Divider.story = {
  parameters: {
    storyDescription: '',
    storySource: {
      source: divider,
    },
  },
};

export const List = () => list;
List.story = {
  parameters: {
    storyDescription: '',
    storySource: {
      source: list,
    },
  },
};

export const Buttons = () => button;
Buttons.story = {
  parameters: {
    storyDescription: 'Buttons in all their different forms and states',
    storySource: {
      source: button,
    },
  },
};

export const Input = () => input;
Input.story = {
  parameters: {
    storyDescription: 'Input in all their different forms and states',
    storySource: {
      source: input,
    },
  },
};

export const Badge = () => badge;
Badge.story = {
  parameters: {
    storyDescription: '',
    storySource: {
      source: badge,
    },
  },
};

export const Radio = () => radio;
Radio.story = {
  parameters: {
    storyDescription: '',
    storySource: {
      source: radio,
    },
  },
};

export const Mswitch = () => mswitch;
Mswitch.story = {
  parameters: {
    storyDescription: '',
    storySource: {
      source: mswitch,
    },
  },
};

export const Box = () => box;
Box.story = {
  parameters: {
    storyDescription: '',
    storySource: {
      source: box,
    },
  },
};

export const Icons = () => icons;
Icons.story = {
  parameters: {
    storyDescription: '',
    storySource: {
      source: icons,
    },
  },
};

export const Link = () => link;
Link.story = {
  parameters: {
    storyDescription: '',
    storySource: {
      source: link,
    },
  },
};
