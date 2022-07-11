-- calculator.hs
import Text.Parsec (char, between, digit, many1)
import Text.Parsec.String (Parser)
import Data.Char (digitToInt)
import Control.Applicative (optional, (<|>), many)

atoi :: [Char] -> Int
atoi = foldl f 0 where
    f s x = 10*s + digitToInt x

decimal :: Parser Int
decimal = atoi <$> many1 digit

expr :: Parser Int
expr = pure eval <*> term <*> many (pure (,) <*> (char '+' <|> char '-') <*> term)

term :: Parser Int
term = pure eval <*> factor <*> many (pure (,) <*> (char '*' <|> char '/') <*> factor)

eval :: Int -> [(Char,Int)] -> Int
eval x [] = x
eval x (('+', x'):xs) = eval (x + x') xs
eval x (('-', x'):xs) = eval (x - x') xs
eval x (('*', x'):xs) = eval (x * x') xs
eval x (('/', x'):xs) = eval (x `div` x') xs

factor :: Parser Int
factor = pure f <*> optional (char '-') <*> (decimal <|> between (char '(') (char ')') expr)
    where
        f Nothing x = x
        f _ x = negate x

