#importing packages
import pygame
import random
import sys
import asyncio
from pygame.locals import *

#defining constants + colours
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
GREY = (200, 200, 200)
DARK_GREY = (150, 150, 150)
GREEN = (0, 200, 0)
YELLOW = (255, 200, 0)

#defining list of words + valid guesses
with open('wordle/words.txt', 'r') as file:
    WORDS = [line.strip() for line in file]
with open('wordle/guesses.txt', 'r') as file:
    GUESSES = [line.strip() for line in file]

#helper functions
def grid(screen):
    for row in range(6):
        for col in range(5):
            x = 180 + (90 * col)
            y = 120 + (90 * row)
            pygame.draw.rect(screen, GREY, (x, y, 80, 80))

def keyboard(screen):
    for col in range(10):
        x = 220 + (35 * col)
        y = 680
        pygame.draw.rect(screen, GREY, (x, y, 30, 30))
    font = pygame.font.Font(None, 30)
    text = font.render("Q   W   E    R   T    Y    U    I    O   P", True, BLACK)
    screen.blit(text, (227, 687))
    for col in range(9):
        x = 238 + (35 * col)
        y = 715
        pygame.draw.rect(screen, GREY, (x, y, 30, 30))
    font = pygame.font.Font(None, 30)
    text = font.render("A    S   D    F    G   H    J   K    L", True, BLACK)
    screen.blit(text, (245, 722))
    for col in range(7):
        x = 270 + (35 * col)
        y = 750
        pygame.draw.rect(screen, GREY, (x, y, 30, 30))
    font = pygame.font.Font(None, 30)
    text = font.render("Z    X    C   V    B   N    M", True, BLACK)
    screen.blit(text, (277, 757))
 
def letters(screen, guesses):
    for row in range(5):
        for col, letter in enumerate(guesses[row]):
            x = 220 + (90 * col)
            y = 160 + (90 * row)
            font = pygame.font.Font(None, 50)
            text = font.render(letter, True, BLACK)
            screen.blit(text, (x - int(text.get_width()) // 2, y - text.get_height() // 2))

def guess(guess1, answer):
    result = []
    for i, letter in enumerate(guess1):
        if letter == answer[i]:
            result.append(GREEN)
        elif letter in answer:
            avaliable = 0
            correct = 0
            for j in range(len(answer)):
                if letter == answer[j]:
                    avaliable += 1
                    if guess1[j] == answer[j]:
                        correct += 1
            for k in range(len(result)):
                if result[k] == YELLOW:
                    if guess1[k] == letter:
                        avaliable -= 1
            presentable = avaliable - correct
            if presentable > 0:
                result.append(YELLOW)
            else:
                result.append(DARK_GREY)
        else:
            result.append(DARK_GREY)
    return result

def update(screen, curr_row, guesses, answer, COLOURS1, COLOURS2, COLOURS3):
    for row in range(curr_row):
        feedback = guess(guesses[row], answer)
        for col, colour in enumerate(feedback):
            x = 180 + (90 * col)
            y = 120 + (90 * row)
            pygame.draw.rect(screen, colour, (x, y, 80, 80))
    if curr_row > 0:
        KEYBOARD1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
        KEYBOARD2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
        KEYBOARD3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
        for letter in KEYBOARD1:
            if str(letter) in str(guesses[curr_row-1]):
                if (COLOURS1[KEYBOARD1.index(letter)] == GREY) or (COLOURS1[KEYBOARD1.index(letter)] == YELLOW):
                    COLOURS1[KEYBOARD1.index(letter)] = feedback[str(guesses[curr_row-1]).index(str(letter))]
        for letter in KEYBOARD2:
            if str(letter) in str(guesses[curr_row-1]):
                if (COLOURS2[KEYBOARD2.index(letter)] == GREY) or (COLOURS2[KEYBOARD2.index(letter)] == YELLOW):
                    COLOURS2[KEYBOARD2.index(letter)] = feedback[str(guesses[curr_row-1]).index(str(letter))]
        for letter in KEYBOARD3:
            if str(letter) in str(guesses[curr_row-1]):
                if (COLOURS3[KEYBOARD3.index(letter)] == GREY) or (COLOURS3[KEYBOARD3.index(letter)] == YELLOW):
                    COLOURS3[KEYBOARD3.index(letter)] = feedback[str(guesses[curr_row-1]).index(str(letter))]
        for col, colour in enumerate(COLOURS1):
            x = 220 + (35 * col)
            y = 680
            pygame.draw.rect(screen, colour, (x, y, 30, 30))
        font = pygame.font.Font(None, 30)
        text = font.render("Q   W   E    R   T    Y    U    I    O   P", True, BLACK)
        screen.blit(text, (227, 687))
        for col, colour in enumerate(COLOURS2):
            x = 238 + (35 * col)
            y = 715
            pygame.draw.rect(screen, colour, (x, y, 30, 30))
        font = pygame.font.Font(None, 30)
        text = font.render("A    S   D    F    G   H    J   K    L", True, BLACK)
        screen.blit(text, (245, 722))
        for col, colour in enumerate(COLOURS3):
            x = 273 + (35 * col)
            y = 750
            pygame.draw.rect(screen, colour, (x, y, 30, 30))
        font = pygame.font.Font(None, 30)
        text = font.render("Z    X    C   V    B   N    M", True, BLACK)
        screen.blit(text, (280, 757))

def update_text(screen, text):
    font1 = pygame.font.Font(None, 40)
    text1 = font1.render(text, True, DARK_GREY)
    text_rect1 = text1.get_rect(center=(400, 90))
    screen.blit(text1, text_rect1)

def play_again_button(screen):
    button_rect = pygame.Rect(350, 380, 100, 40)
    pygame.draw.rect(screen, WHITE, button_rect)
    font2 = pygame.font.Font(None, 30)
    text2 = font2.render('PLAY AGAIN :)', True, BLACK, GREEN)
    text_rect2 = text2.get_rect(center=button_rect.center)
    screen.blit(text2, text_rect2)
    return button_rect

async def win_or_lose(screen, text):
    pygame.draw.rect(screen, WHITE, pygame.Rect(200,300,400,200))
    font3 = pygame.font.Font(None, 40)
    text3 = font3.render(f'{text}', True, BLACK)
    text_rect3 = text3.get_rect(center=(400, 350))
    screen.blit(text3, text_rect3)
    play_again_button_rect = play_again_button(screen)
    pygame.display.flip()

    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_RETURN:
                    await main()
            elif event.type == pygame.MOUSEBUTTONDOWN:
                if event.button == 1:
                    if play_again_button_rect.collidepoint(event.pos):
                        await main()

async def main():
    asyncio.sleep(0)

    #starting game + screen
    pygame.init()
    screen = pygame.display.set_mode((800, 800))
    pygame.display.set_caption("wordle :)")
    font_big = pygame.font.Font(None, 50)
    font_small = pygame.font.Font(None, 30)

    #defining variables + choosing answer
    guesses = ["" for _ in range(6)]
    curr_row = 0
    input = ""
    content = " "
    COLOURS1 = [GREY for _ in range(10)]
    COLOURS2 = [GREY for _ in range(9)]
    COLOURS3 = [GREY for _ in range(7)]
    ANSWER = random.choice(WORDS).upper()

    gameOn = True

    #game loop
    while gameOn:
        screen.fill(WHITE)

        grid(screen)
        keyboard(screen)
        update(screen, curr_row, guesses, ANSWER, COLOURS1, COLOURS2, COLOURS3)
        letters(screen, guesses)
        update_text(screen, content)

        #add text
        title = font_big.render('WORDLE', True, BLACK)
        title_rect = title.get_rect(center=(400, 30))
        screen.blit(title, title_rect)
        credit = font_small.render('made by georgia mason :)', True, BLACK)
        credit_rect = credit.get_rect(center=(400, 60))
        screen.blit(credit, credit_rect)

        for event in pygame.event.get():
            if event.type == KEYDOWN:
                if event.key == K_BACKSPACE:
                    input = input[:-1]
                elif event.key == pygame.K_RETURN:
                    if len(input) == 5:
                        if curr_row < 5:
                            if any(element in input.lower() for element in GUESSES):
                                guesses[curr_row] = input
                                if input == ANSWER:
                                    await win_or_lose(screen, "You won! :)")
                                    content = " "
                                    input = ""
                                curr_row += 1
                                input = ""
                                content = " "
                            else:
                                content = "Input is not a Valid Guess :("
                        else:
                            await win_or_lose(screen, f"You lost :( The answer was {ANSWER}")
                            content = " "
                            input = ""
                    else: 
                        content = "Input is too short :("
                elif len(input) < 5 and event.unicode.isalpha():
                    input += event.unicode.upper()
            elif event.type == QUIT:
                gameOn = False

        length = len(input)
        if length > 0:
            letter1 = font_big.render(input[0], True, BLACK)
            screen.blit(letter1, (210, 145 + (90 * curr_row)))
        if length > 1:
            letter2 = font_big.render(input[1], True, BLACK)
            screen.blit(letter2, (300, 145 + (90 * curr_row)))
        if length > 2:
            letter3 = font_big.render(input[2], True, BLACK)
            screen.blit(letter3, (390, 145 + (90 * curr_row)))
        if length > 3:
            letter4 = font_big.render(input[3], True, BLACK)
            screen.blit(letter4, (480, 145 + (90 * curr_row)))
        if length > 4:
            letter5 = font_big.render(input[4], True, BLACK)
            screen.blit(letter5, (570, 145 + (90 * curr_row)))

        pygame.display.flip()

asyncio.run(main())