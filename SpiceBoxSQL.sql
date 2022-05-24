USE [master]
GO
IF db_id('SpiceBoxDB') IS NULL
  CREATE DATABASE [SpiceBoxDB]
GO
USE [SpiceBoxDB]
GO

DROP TABLE IF EXISTS [Recipe];
DROP TABLE IF EXISTS [User];

CREATE TABLE [Recipe] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [Name] nvarchar(255) NOT NULL,
  [ImageUrl] nvarchar(255) NOT NULL,
  [Time] nvarchar(255) NOT NULL,
  [Favorite] bit NOT NULL,
  [Ingredients] varchar(max) NOT NULL,
  [Instructions] varchar(max) NOT NULL,
  [Comments] nvarchar(255),
  [UserId] integer NOT NULL,
)
GO

CREATE TABLE [User] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [Name] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [FirebaseId] nvarchar(255) NULL,
)
GO

ALTER TABLE [Recipe] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

SET IDENTITY_INSERT [User] ON
INSERT INTO [User]
  ([Id], [Name], [Email],[FirebaseId])
VALUES 
  (1, 'Harika', 'hcodes11@email.com','');
INSERT INTO [User]
  ([Id], [Name], [Email],[FirebaseId])
VALUES 
  (2, 'Stan Laurel', 'stan@email.com','');
SET IDENTITY_INSERT [User] OFF
SET IDENTITY_INSERT [Recipe] ON
INSERT INTO [Recipe]
  ([Id], [Name], [ImageUrl],[Time],[Favorite],[Ingredients],[Instructions],[Comments],[UserId])
VALUES
(1, 'Chicken Biryani', 'https://norecipes.com/wp-content/uploads/2017/05/chicken-biryani-12-1200x1799.jpg', '40 minutes', 1,'25g butter
1 large onion, finely sliced
1 bay leaf
3 cardamom pods
small cinnamon stick
1 tsp turmeric
4 skinless chicken breasts, cut into large chunks
4 tbsp balti curry paste
85g raisins
850ml chicken stock
30g coriander, ½ chopped, ½ leaves picked and 2 tbsp toasted flaked almonds, to serve','STEP 1
Soak 300g basmati rice in warm water, then wash in cold until the water runs clear.

STEP 2
Heat 25g butter in a saucepan and cook 1 finely sliced large onion with 1 bay leaf, 3 cardamom pods and 1 small cinnamon stick for 10 mins.

STEP 3
Sprinkle in 1 tsp turmeric, then add 4 chicken breasts, cut into large chunks, and 4 tbsp curry paste. Cook until aromatic.

STEP 4
Stir the rice into the pan with 85g raisins, then pour over 850ml chicken stock.

STEP 5
Place a tight-fitting lid on the pan and bring to a hard boil, then lower the heat to a minimum and cook the rice for another 5 mins.

STEP 6
Turn off the heat and leave for 10 mins. Stir well, mixing through 15g chopped coriander. To serve, scatter over the leaves of the remaining 15g coriander and 2 tbsp toasted almonds.', 'Everyone loves it but takes too long to cook',1),

  (2, 'Scrambled Eggs', 'https://cdn.loveandlemons.com/wp-content/uploads/2021/05/scrambled-eggs-1-580x851.jpg','5 minutes',0,'3 large eggs
1 teaspoon milk, plant milk, or water
Extra-virgin olive oil or butter, for the pan
Sea salt and fresh black pepper
Chopped fresh chives, optional, for garnish','Crack the eggs into a medium bowl and add the milk or water. Whisk until smooth and combined, with no streaks of egg white remaining.
Brush a small nonstick skillet with olive oil, or melt a little butter in a small nonstick skillet. Bring to medium heat.
Pour in the eggs, and let them cook for a few seconds without stirring. Pull a rubber spatula across the bottom of the pan to form large, soft curds of scrambled eggs.
Continue cooking over medium-low heat, folding and stirring the eggs every few seconds. Scrape the spatula along the bottom and sides of the pan often to form more curds and to prevent any part of the eggs from drying out.
Remove the pan from the heat when the eggs are mostly set, but a little liquid egg remains. Season to taste with salt and pepper and garnish with chopped fresh chives, if desired.','I am allergic to eggs',2 );
SET IDENTITY_INSERT [Recipe] OFF

  


