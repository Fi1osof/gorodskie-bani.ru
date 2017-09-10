<?php 

/*
    Пересоздаем индексы для всех документов,
    у которых еще нет индексов
*/

@ini_set('max_execution_time', 0);
ignore_user_abort(true);

print '<pre>';
ini_set('display_errors', 1);
$modx->switchContext('web');
$modx->setLogLevel(3);
$modx->setLogTarget('HTML');

// Сбросить все текущие индексы
// $this->modx->removeCollection('modSearchIndex', array(
//     // "resource_id"   => $doc->id,
// ));

 
$q = $modx->newQuery('modResource');

$alias = $q->getAlias();

$indexesTable = $modx->getTableName('modSearchIndex');

$q->where(array(
    "deleted"   => 0,
    "published"   => 1,
));

$q->query['where'][] = new xPDOQueryCondition(
    array(
        'sql' => "NOT EXISTS (SELECT NULL FROM {$indexesTable} i where i.resource_id = {$alias}.id)"
    )
);


$q->select(array(
    "{$alias}.*",
));

// Сколько за раз документов обновлять
$q->limit(100);

$s = $q->prepare();
$s->execute();

// print_r($s->errorInfo());
// print $q->toSQL();

// Сколько всего документов на индексацию
// print $modx->getCount('modResource', $q);

// return;

while($row = $s->fetch(PDO::FETCH_ASSOC)){
    $modx->error->reset();
    
    unset($row['publishedon']);
    unset($row['createdon']);
    unset($row['deletedon']);
    unset($row['editedon']);
    
    $response = $modx->runProcessor('resource/update', $row);
    if($response->isError()){
        print_r($response->getResponse());
        return false;
    }
    // print_r($row);
    // break;
}


 
$memory = round(memory_get_usage(true)/1024/1024, 4).' Mb';
print "<div>Memory: {$memory}</div>";
$totalTime= (microtime(true) - $modx->startTime);
$queryTime= $modx->queryTime;
$queryTime= sprintf("%2.4f s", $queryTime);
$queries= isset ($modx->executedQueries) ? $modx->executedQueries : 0;
$totalTime= sprintf("%2.4f s", $totalTime);
$phpTime= $totalTime - $queryTime;
$phpTime= sprintf("%2.4f s", $phpTime);
print "<div>TotalTime: {$totalTime}</div>";