<div class="form-group {if $response.field_errors.{$properties.name}}has-error{/if}">
    <div class="checkbox">
        
        <label for="{$properties.name}">
            {$properties.label}    
        </label>
    
        {foreach $properties.list as $item}
            <label>
                <input type="checkbox" name="{$item.name}" data-type="{$item.name}" value="{$item.label}" {if $request.{$item.name}}checked{/if}> {$item.label}
            </label>
        {/foreach}
    </div>
    
    
    {if $properties.child}
        <div class="options">
            {$properties.child}
        </div>
    {/if}
</div>