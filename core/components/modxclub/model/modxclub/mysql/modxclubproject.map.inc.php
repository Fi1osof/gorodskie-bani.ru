<?php
$xpdo_meta_map['ModxclubProject']= array (
  'package' => 'Modxclub',
  'version' => '1.1',
  'table' => 'modxclub_projects',
  'extends' => 'xPDOObject',
  'fields' => 
  array (
    'category' => NULL,
    'task' => NULL,
  ),
  'fieldMeta' => 
  array (
    'category' => 
    array (
      'dbtype' => 'int',
      'precision' => '10',
      'attributes' => 'unsigned',
      'phptype' => 'integer',
      'null' => false,
      'index' => 'pk',
    ),
    'task' => 
    array (
      'dbtype' => 'int',
      'precision' => '10',
      'attributes' => 'unsigned',
      'phptype' => 'integer',
      'null' => false,
      'index' => 'pk',
    ),
  ),
  'indexes' => 
  array (
    'PRIMARY' => 
    array (
      'alias' => 'PRIMARY',
      'primary' => true,
      'unique' => true,
      'type' => 'BTREE',
      'columns' => 
      array (
        'category' => 
        array (
          'length' => '',
          'collation' => 'A',
          'null' => false,
        ),
        'task' => 
        array (
          'length' => '',
          'collation' => 'A',
          'null' => false,
        ),
      ),
    ),
  ),
  'aggregates' => 
  array (
    'Category' => 
    array (
      'class' => 'modResource',
      'local' => 'category',
      'foreign' => 'id',
      'owner' => 'foreign',
      'cardinality' => 'one',
    ),
    'Tasks' => 
        array (
        'class' => 'ModzillaTask',
        'local' => 'task',
        'foreign' => 'id',
        'owner' => 'foreign',
        'cardinality' => 'one',
     ),
  ),
);
