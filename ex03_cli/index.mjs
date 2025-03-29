// импорт стандартного модуля node:process
import process from 'node:process';
// альтернативный способ импорта только stdin, stdout из node:process
// import {stdin, stdout} from 'node:process';

// вывод набора аргументов, полученных при запуске приложения
console.log('Набор аргументов argv:', process.argv);

// вывод в stdout
process.stdout.write("Hello, stdout\n");

// вывод в stderr
process.stderr.write("This is Error\n");

// кросплатформенный стандартный ввод (stdin):
// импорт стандартного модуля node:readline
import readline from 'node:readline';

const isTTY = process.stdin.isTTY;

if (isTTY) {
  console.log('Стандартный ввод осуществляется из терминала (TTY) (интерактивный режим)');
} else {
  console.log('Стандартный ввод осуществляется НЕ из терминала (TTY) (режим работы через конвейер)');
}

// создаётся интерфейс для чтения stdin
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// просто сообщение для пользователя
console.log('Нажмите Ctrl+C для выхода.');

// с эту переменную собираем данные из стандартного ввода
let input = '';

// обрабатывается событие ввода одной строки (после ввода и нажатия на Enter)
rl.on('line', (line) => {
  console.log(`Прочитана строка: \n${line}`);
  input += line + '\n';
});

// обрабатывается событие получения сигнала завершения приложения (SIGINT)
rl.on('close', () => {
  console.log(`Получен ввод: \n${input}`);
  process.exit(0);
});

// при плоучении процессом сигнала SIGINT вызывается событие закрытия 
// интерфейса readline (которое затем отслеживается в строке 45)
process.on('SIGINT', () => {
  rl.close();
});