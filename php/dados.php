<?php 
function mysqlConnect() {
    $host = "localhost";
    $username = "felipe";
    $password = "felipe";
    $dbname = "bd_pp2";
    $options = [
        PDO::ATTR_EMULATE_PREPARES => false, // desativa a execução emulada de prepared statements
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, // ativa o modo de erros para lançar exceções
        PDO::ATTR_PERSISTENT => true, // ativa o uso de conexões persistentes para maior eficiência
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, // altera o modo de busca padrão para FETCH_ASSOC
    ];
    try {
    // O objeto $pdo será utilizado nas operações com o BD
    $pdo = new PDO("mysql:host=$host; dbname=$dbname; charset=utf8mb4", $username, $password, $options);
    echo "CONEXÃO FEITA";
    return $pdo;
    } catch (Exception $e) {
    exit('Falha na conexão com o MySQL: ' . $e->getMessage());
    }
} 
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"> 
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>fodase</title>
</head>
<body>
    <?php
    $pdo = mysqlConnect();

    $numLinhasAfetadas = $pdo->exec("INSERT INTO dados VALUES ('FELIPE', '41851815821', '17992289149', 'flemedias@gmail.com');");
    ?>
</body>
</html>