# 🔍 Вычислитель отличий (gendiff)

> CLI-утилита для сравнения конфигурационных файлов. Показывает что изменилось между двумя версиями файла.

---

### Статус

[![Hexlet Check](https://github.com/Check1stDev/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Check1stDev/frontend-project-46/actions)
[![CI](https://github.com/Check1stDev/frontend-project-46/actions/workflows/ci.yml/badge.svg)](https://github.com/Check1stDev/frontend-project-46/actions/workflows/ci.yml)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Check1stDev_frontend-project-46&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Check1stDev_frontend-project-46)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Check1stDev_frontend-project-46&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Check1stDev_frontend-project-46)

---

### Демо

[![asciicast](https://asciinema.org/a/sCRMIb4kJfCFwK9d.svg)](https://asciinema.org/a/sCRMIb4kJfCFwK9d)

---

## ✨ Функциональность

- 📄 Сравнение JSON и YAML файлов
- 🌲 Поддержка вложенных структур
- 🎨 Три формата вывода: `stylish`, `plain`, `json`
- 🖥 Работает как CLI-утилита

---

## 🛠 Стек

| Инструмент | Назначение |
|---|---|
| [Node.js](https://nodejs.org/) | Среда выполнения |
| [Commander](https://github.com/tj/commander.js) | CLI-интерфейс |
| [js-yaml](https://github.com/nodeca/js-yaml) | Парсинг YAML |
| [Lodash](https://lodash.com/) | Утилиты для работы с данными |
| [Jest](https://jestjs.io/) | Тестирование |

---

## 🚀 Установка

```bash
npm install
npm link
```

## 📖 Использование

```bash
gendiff [options] <filepath1> <filepath2>
```

### Опции

```
-f, --format <type>   формат вывода: stylish (по умолчанию), plain, json
-h, --help            показать справку
-V, --version         показать версию
```

### Примеры

```bash
# Сравнение с форматом по умолчанию (stylish)
gendiff file1.json file2.json

# Формат plain
gendiff --format plain file1.yml file2.yml

# Формат json
gendiff --format json file1.json file2.json
```

---

## 🧪 Тесты

```bash
npm test
npm run test:coverage
```
