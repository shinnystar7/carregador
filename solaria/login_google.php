<?php
session_start();
require_once("conexao.php");

if ($_POST["tipo"] === "google") {
    $nome = $_POST["nome"];
    $email = $_POST["email"];

    // Verifica se o usuário já existe
    $sql = "SELECT * FROM usuarios WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$email]);

    if ($stmt->rowCount() === 0) {
        // Insere novo usuário
        $sql = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, '')";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$nome, $email]);
    }

    $_SESSION["usuario"] = $email;

    echo json_encode(["status" => "success", "message" => "Login com Google realizado com sucesso!"]);
} else {
    echo json_encode(["status" => "error", "message" => "Requisição inválida."]);
}
?>
