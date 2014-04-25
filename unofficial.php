 <?php
// error_reporting(0);
    define('DB_HOST','68.178.143.5');
    define('DB_USER','rrcproject');
    define('DB_PASS','UserPass1!');
    define('DB_NAME','rrcproject');

    // Create a MySQLi resource object called $db.
    $db = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME); 

    // If an error occurs we can look here for more info:
    //$connection_error = mysqli_connect_errno();
    //$connection_error_message = mysqli_connect_error();
    
    $sql = "SELECT official_urls.official_url_link, official_links.official_link_title
            FROM official_urls
            INNER JOIN official_links ON official_urls.official_url_foreign = official_links.official_link_id
            ORDER BY official_urls.official_url_foreign";
    $results = $db->query($sql);
    
    $data = array();
    while ( $row = $results->fetch_assoc())    
    {
        $data[] = $row;
    }
    echo json_encode( $data );
 ?>