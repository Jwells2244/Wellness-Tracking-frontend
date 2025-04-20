const videosData = [
  {
    instructor: { name: 'Ashley', gender: 'Female', expertise: 10 },
    type: 'HIIT',
    category: 'Physical',
    videoUrl: 'https://www.youtube.com/embed/jqUGUYpxQ7U'
  },
  {
    instructor: { name: 'Marie Steffen', gender: 'Female', expertise: 3 },
    type: 'Flexibility',
    category: 'Physical',
    videoUrl: 'https://www.youtube.com/embed/i6TzP2COtow'
  },
  {
    instructor: { name: 'Kait', gender: 'Female', expertise: 1 },
    type: 'Keto Meals',
    category: 'Diet Meal',
    videoUrl: 'https://www.youtube.com/embed/5pB50geyGOM'
  },
  {
    instructor: { name: 'Zoe', gender: 'Male', expertise: 4 },
    type: 'Paleo Meals',
    category: 'Diet Meal',
    videoUrl: 'https://www.youtube.com/embed/as7BrOe42dg'
  },
    {
      instructor: { name: 'Marie', gender: 'Female', expertise: 2 },
      type: 'Running',
      category: 'Physical',
      videoUrl: 'https://www.youtube.com/embed/vv54e5YR6uA'
    },
    {
      instructor: { name: 'Rick', gender: 'Male', expertise: 5 },
      type: 'Cardio',
      category: 'Physical',
      videoUrl: 'https://www.youtube.com/embed/melA7IB117I'
    },
    {
      instructor: { name: 'Caroline', gender: 'Female', expertise: 8 },
      type: 'Cardio',
      category: 'Physical',
      videoUrl: 'https://www.youtube.com/embed/kZDvg92tTMc'
    },
    {
      instructor: { name: 'Tony Roy', gender: 'Male', expertise: 11 },
      type: 'Flexibility',
      category: 'Physical',
      videoUrl: 'https://www.youtube.com/embed/FI51zRzgIe4'
    },
    {
      instructor: { name: 'Angelia', gender: 'Female', expertise: 8 },
      type: 'Low Carb Meals',
      category: 'Diet Meal',
      videoUrl: 'https://www.youtube.com/embed/QEOdwA1LCsU'
    },
    {
      instructor: { name: 'Daniela', gender: 'Female', expertise: 1 },
      type: 'Flexibility',
      category: 'Physical',
      videoUrl: 'https://www.youtube.com/embed/YfCK3uOz1r4'
    },
    {
      instructor: { name: 'Carolina', gender: 'Female', expertise: 4 },
      type: 'Strength Training',
      category: 'Physical',
      videoUrl: 'https://www.youtube.com/embed/GViX8riaHX4'
    },
    {
      instructor: { name: 'Roberta', gender: 'Female', expertise: 4 },
      type: 'Cardio',
      category: 'Physical',
      videoUrl: 'https://www.youtube.com/embed/cZyHgKtK75A'
    },
    {
      instructor: { name: 'Tone', gender: 'Male', expertise: 6 },
      type: 'Strength Training',
      category: 'Physical',
      videoUrl: 'https://www.youtube.com/embed/7GkMHPe_OXw'
    },
    {
      instructor: { name: 'Kaleigh', gender: 'Female', expertise: 1 },
      type: 'Cycling',
      category: 'Physical',
      videoUrl: 'https://www.youtube.com/embed/8PJMYSB1kxQ'
    },
    {
      instructor: { name: 'Barbell', gender: 'Male', expertise: 3 },
      type: 'Strength Training',
      category: 'Physical',
      videoUrl: 'https://www.youtube.com/embed/34LJX-arUo8'
    },
    {
      instructor: { name: 'Ben', gender: 'Male', expertise: 6 },
      type: 'Running',
      category: 'Physical',
      videoUrl: 'https://www.youtube.com/embed/3RN7-oOTIEw'
    },
    {
      instructor: { name: 'Manni', gender: 'Male', expertise: 12 },
      type: 'Running',
      category: 'Physical',
      videoUrl: 'https://www.youtube.com/embed/yN8tKZobL8c'
    },
    {
      instructor: { name: 'Nancy', gender: 'Female', expertise: 5 },
      type: 'Yoga',
      category: 'Physical',
      videoUrl: 'https://www.youtube.com/embed/Eml2xnoLpYE'
    },
    {
      instructor: { name: 'William', gender: 'Male', expertise: 5 },
      type: 'Motivation',
      category: 'Mental',
      videoUrl: 'https://www.youtube.com/embed/KPUA05Mr1m8'
    },
    {
      instructor: { name: 'Kassandra', gender: 'Female', expertise: 7 },
      type: 'Yoga',
      category: 'Physical',
      videoUrl: 'https://www.youtube.com/embed/CM43AZaRXNw'
    },
    {
      instructor: { name: 'Liezl', gender: 'Female', expertise: 12 },
      type: 'High Protein Meals',
      category: 'Diet Meal',
      videoUrl: 'https://www.youtube.com/embed/j4iQkKYFH1E'
    },
    {
      instructor: { name: 'Nicole', gender: 'Female', expertise: 14 },
      type: 'Yoga',
      category: 'Physical',
      videoUrl: 'https://www.youtube.com/embed/uqJ-jANozcE'
    },
    {
      instructor: { name: 'Mariana', gender: 'Female', expertise: 9 },
      type: 'Cycling',
      category: 'Physical',
      videoUrl: 'https://www.youtube.com/embed/ewrf_rCHUdA'
    },
    {
      instructor: { name: 'Phillip', gender: 'Male', expertise: 1 },
      type: 'Yoga',
      category: 'Physical',
      videoUrl: 'https://www.youtube.com/embed/16u9UJekrG0'
    },
    {
      instructor: { name: 'John', gender: 'Male', expertise: 8 },
      type: 'Pilates',
      category: 'Physical',
      videoUrl: 'https://www.youtube.com/embed/0MsirNd1AnY'
    },
    {
      instructor: { name: 'Nicole', gender: 'Female', expertise: 9 },
      type: 'Pilates',
      category: 'Physical',
      videoUrl: 'https://www.youtube.com/embed/y2RcYo36boM'
    },
    {
      instructor: { name: 'Gurudra', gender: 'Female', expertise: 19 },
      type: 'Tips',
      category: 'Mental',
      videoUrl: 'https://www.youtube.com/embed/j0_0O-FmLtc'
    },
    {
      instructor: { name: 'Sadhguru', gender: 'Male', expertise: 6 },
      type: 'Tips',
      category: 'Mental',
      videoUrl: 'https://www.youtube.com/embed/wOGqlVqyvCM'
    },
    {
      instructor: { name: 'Trinity', gender: 'Female', expertise: 5 },
      type: 'HIIT',
      category: 'Physical',
      videoUrl: 'https://www.youtube.com/embed/cbKkB3POqaY'
    },
    {
      instructor: { name: 'Nemoto', gender: 'Male', expertise: 2 },
      type: 'Mindfulness',
      category: 'Mental',
      videoUrl: 'https://www.youtube.com/embed/tqhxMUm7XXU'
    },
    {
      instructor: { name: 'Sarah', gender: 'Female', expertise: 2 },
      type: 'HIIT',
      category: 'Physical',
      videoUrl: 'https://www.youtube.com/embed/jeLxN-wt7jY'
    },
    {
      instructor: { name: 'Sunny', gender: 'Male', expertise: 2 },
      type: 'Cardio',
      category: 'Physical',
      videoUrl: 'https://www.youtube.com/embed/9psH-BsJ_IM'
    },
    {
      instructor: { name: 'Jackson', gender: 'Male', expertise: 3 },
      type: 'HIIT',
      category: 'Physical',
      videoUrl: 'https://www.youtube.com/embed/npofZutKsfA'
    },
    {
      instructor: { name: 'Toni Mitchell', gender: 'Female', expertise: 5 },
      type: 'Flexibility',
      category: 'Physical',
      videoUrl: 'https://www.youtube.com/embed/-SD_MucCa6c'
    },
    {
      instructor: { name: 'James', gender: 'Male', expertise: 4 },
      type: 'HIIT',
      category: 'Physical',
      videoUrl: 'https://www.youtube.com/embed/uTo2m16eJqI'
    },
    {
      instructor: { name: 'Tim Crain', gender: 'Male', expertise: 6 },
      type: 'Cycling',
      category: 'Physical',
      videoUrl: 'https://www.youtube.com/embed/wBurKQX7h4Q'
    },
    {
      instructor: { name: 'Sean', gender: 'Male', expertise: 4 },
      type: 'Pilates',
      category: 'Physical',
      videoUrl: 'https://www.youtube.com/embed/dHmoD-ArFYo'
    },
    {
      instructor: { name: 'Mayank', gender: 'Male', expertise: 2 },
      type: 'Vegan Meals',
      category: 'Diet Meal',
      videoUrl: 'https://www.youtube.com/embed/ND-VLi6C5tA'
    },
    {
      instructor: { name: 'James', gender: 'Male', expertise: 4 },
      type: 'Meditation',
      category: 'Mental',
      videoUrl: 'https://www.youtube.com/embed/6p_yaNFSYao'
    },
    {
      instructor: { name: 'James Bond', gender: 'Male', expertise: 12 },
      type: 'Keto Meals',
      category: 'Diet Meal',
      videoUrl: 'https://www.youtube.com/embed/kcNoT8aGWC8'
    },
    {
        instructor: { name: 'Manoj', gender: 'Male', expertise: 3 },
        type: 'Meditation',
        category: 'Mental',
        videoUrl: 'https://www.youtube.com/embed/vj0JDwQLof4'
      },
    {
        instructor: { name: 'Abby', gender: 'Female', expertise: 1 },
        type: 'Mindfulness',
        category: 'Mental',
        videoUrl: 'https://www.youtube.com/embed/ztTexqGQ0VI'
      },
      {
        instructor: { name: 'Demetri', gender: 'Female', expertise: 1 },
        type: 'Motivation',
        category: 'Mental',
        videoUrl: 'https://www.youtube.com/embed/Fo6oU4DfdH0'
      },
      {
        instructor: { name: 'Freud', gender: 'Female', expertise: 10 },
        type: 'Motivation',
        category: 'Mental',
        videoUrl: 'https://www.youtube.com/embed/DxIDKZHW3-E'
      },
      {
        instructor: { name: 'Sadhguru', gender: 'Male', expertise: 9},
        type: 'Tips',
        category: 'Mental',
        videoUrl: 'https://www.youtube.com/embed/RlF-tO2YVPg'
      },
    {
      instructor: { name: 'Chef Anna', gender: 'Female', expertise: 5 },
      type: 'Vegan Meals',
      category: 'Diet Meal',
      videoUrl: 'https://www.youtube.com/embed/SYKwfB8LRhc'
    },
    {
      instructor: { name: 'Chef Ron', gender: 'Male', expertise: 6 },
      type: 'Keto Meals',
      category: 'Diet Meal',
      videoUrl: 'https://www.youtube.com/embed/vwwisKOOEqE'
    },
      {
        instructor: { name: 'Jessica', gender: 'Female', expertise: 2 },
        type: 'Paleo Meals',
        category: 'Diet Meal',
        videoUrl: 'https://www.youtube.com/embed/BpokZcdrAlU'
      },
      {
        instructor: { name: 'Sephinew', gender: 'Female', expertise: 8 },
        type: 'Paleo Meals',
        category: 'Diet Meal',
        videoUrl: 'https://www.youtube.com/embed/hsSGkpdJ_1o'
      },
      {
        instructor: { name: 'Becky', gender: 'Female', expertise: 5 },
        type: 'Low Carb Meals',
        category: 'Diet Meal',
        videoUrl: 'https://www.youtube.com/embed/OHEHjGJgSnw'
      },
      {
        instructor: { name: 'Trevor', gender: 'Male', expertise: 2},
        type: 'Low Carb Meals',
        category: 'Diet Meal',
        videoUrl: 'https://www.youtube.com/embed/BjMjCHQE0iE'
      },
      {
        instructor: { name: 'Kate', gender: 'Female', expertise: 4 },
        type: 'High Protein Meals',
        category: 'Diet Meal',
        videoUrl: 'https://www.youtube.com/embed/aV2QkDfVGqA'
      },
      {
        instructor: { name: 'Kevin', gender: 'Male', expertise: 4 },
        type: 'Cycling',
        category: 'Physical',
        videoUrl: 'https://www.youtube.com/embed/0L9BYzo98FA'
      },
      {
        instructor: { name: 'Joey', gender: 'Male', expertise: 1 },
        type: 'High Protein Meals',
        category: 'Diet Meal',
        videoUrl: 'https://www.youtube.com/embed/sKren-PKhec'
      },
      {
        instructor: { name: 'Ria', gender: 'Female', expertise: 8 },
        type: 'Meditation',
        category: 'Mental',
        videoUrl: 'https://www.youtube.com/embed/VpHz8Mb13_Y'
      },
  ];
  
  export default videosData;
  